import Order from "../Models/Order.js";
import Cart from '../Models/Cart.js';
import Crypto from 'crypto';
import Razorpay from 'razorpay';
import dotenv from 'dotenv'; 
dotenv.config();

const razorpayInstance = new Razorpay({
    key_id: process.env.Test_API_Key,
    key_secret: process.env.Test_Key_Secret
});

// COD function
export const setOrder = async (req, res) => {
    try {
        const { userId, items, totalAmount, SelectAddress } = req.body;

        const newOrder = new Order({
            userId,
            items,
            totalAmount,
            Address: SelectAddress,
            paymentMethod: 'COD',
            paymentStatus: 'pending'
        });
        const orderId = await newOrder.save();

        await Cart.findOneAndUpdate({ userId }, { items: [] });
        res.status(200).json({ 
            success: true,
            message: "Order Submit Successfully",
            orderId: orderId._id
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        console.log("Error=>", error);
    }
};

// Online Order Function
export const OnlineOrder = async (req, res) => {
    try {
        const { userId, items, totalAmount, SelectAddress } = req.body;

        // FIXED: Math.round lagane se floating points integer ban jate hain (Razorpay Requirement)
        const amountInPaise = Math.round(Number(totalAmount) * 100);

        const option = {
            amount: amountInPaise, 
            currency: "INR",
            receipt: `receipt_order_${Date.now()}`
        };

        const razorpayOrder = await razorpayInstance.orders.create(option);

        const newOrder = new Order({
            userId,
            items,
            totalAmount,
            Address: SelectAddress,
            paymentMethod: "ONLINE",
            razorpayOrderId: razorpayOrder.id,
            paymentStatus: "pending" 
        });

        const saveOrder = await newOrder.save();

        await Cart.findOneAndUpdate({ userId }, { items: [] });

        res.status(200).json({
            message: "Razorpay Order Initiated Successfully",
            order: razorpayOrder,
            orderId: saveOrder._id   
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        console.log(error);
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = Crypto
            .createHmac("sha256", process.env.Test_Key_Secret)
            .update(sign.toString())
            .digest("hex");
        console.log("Asli expected signature ye hai bhai =>", expectedSignature);

        if (razorpay_signature === expectedSignature) {
            await Order.findByIdAndUpdate(orderId, {
                paymentStatus: "Success",
                razorpayPaymentId: razorpay_payment_id
            });

            return res.status(200).json({
                success: true,
                message: "Payment Verified & Order Placed Successfully"
            });
        } else {
            return res.status(400).json({ message: "Invalid Payment Signature! Fraud detected." });
        }

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
        console.log(error);
    }
};

export const getAllOrderForAdmin = async (req, res) => {
    try {
        const order = await Order.find()
            .populate('userId', 'fullName email')
            .populate('items.productId', 'name price');
        res.status(200).json({ status: true, order });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        console.log("Error=>", error);
    }
};