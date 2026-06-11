import Order from "../Models/Order.js";
import Cart from '../Models/Cart.js';
import Crypto from 'crypto';
import Razorpay from 'razorpay'
import dotenv from 'dotenv'; 
dotenv.config();

const razorpayInstance = new Razorpay({
    key_id:process.env.Test_API_Key,
    key_secret:process.env.Test_Key_Secret
})  

// COD function
export const setOrder = async (req, res) => {
    try {
        const { userId, items, totalAmount, SelectAddress } = req.body;

        const newOrder = new Order({
            userId,
            items,
            totalAmount,
            Address: SelectAddress,
            paymentMethod:'COD',
            paymentStatus:'pending'

        });
        const orderId = await newOrder.save();
       

        await Cart.findOneAndUpdate({ userId }, { items: [] })
        res.status(200).json({ 
            success:true,
             message: "Oredr Submit Successfully",
            orderId:orderId._id

        });
        

    } catch (error) {
        res.status(500).json({ message: "Server Error", error })
        console.log("Error=>", error)
    }

}

// Online Order Function
export const OnlineOrder = async(req,res)=>{
    try{
      const {userId,items,totalAmount,SelectAddress} = req.body

      const amountInPaise = Number(totalAmount)*100;

      const option = {
        amount :amountInPaise, 
        currency:"INR",
        receipt:`receipt_order_${Date.now()}`
      }

      const razorpayOrder = await razorpayInstance.orders.create(option);

      const newOrder = new Order({
          userId,
          items,
          totalAmount,
          Address:SelectAddress,
          paymentMethod:"ONLINE",
          razorpayOrderId: razorpayOrder.id,
          paymentStatus:"pending" 
      });

      const saveOrder = await newOrder.save();

      await Cart.findOneAndUpdate({ userId }, { items: [] });

      res.status(200).json({
        message:"Razorpay Order Initiated Successfully",
        order:razorpayOrder,
        orderId:saveOrder._id   
    })
    }catch(error){
        res.status(500).json({message:"Server Error",error})
        console.log(error)
    }
}



export const verifyPayment = async (req,res)=>{
    try{
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature,orderId} = req.body;

        const sign = razorpay_order_id + "|" +razorpay_payment_id;

        const expectedSignature = Crypto
        .createHmac("sha256",process.env.Test_Key_Secret)
        .update(sign.toString())
        .digest("hex");
        console.log("Asli expected signature ye hai bhai =>", expectedSignature);

        if(razorpay_signature === expectedSignature){
            await Order.findByIdAndUpdate(orderId,{
                paymentStatus:"Success",
                razorpayPaymentId:razorpay_payment_id
            });

            return res.status(200).json({
                success:true,
                message:"Payment Verified & Order Placed Successfully"
            });
        }else{
            return res.status(400).json({message:"Invalid Payment Signature! Fraud detected."})
        }

    }catch(error){
        res.status(500).json({message:"Server Error"})
        console.log(error)
    }
}




































// import crypto from 'crypto';
// import Razorpay from 'razorpay';
// import { Order } from '../models/Order.js'; // Tumhara single order model

// // 🔌 Razorpay Instance Configuration
// const razorpayInstance = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID, 
//     key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// // 1️⃣ FUNCTION: Cash on Delivery (COD) Order
// export const createCodOrder = async (req, res) => {
//     try {
//         const { userId, items, Address, totalAmount } = req.body;

//         const newOrder = new Order({
//             userId,
//             items,
//             Address,
//             totalAmount,
//             paymentMethod: 'COD',
//             paymentStatus: 'Pending' // COD mein paise baad mein milenge
//         });

//         await newOrder.save();

//         res.status(201).json({
//             success: true,
//             message: "Order placed successfully via Cash on Delivery!",
//             order: newOrder
//         });
//     } catch (error) {
//         console.log("COD Order Error:", error);
//         res.status(500).json({ success: false, message: "COD Order failed!", error: error.message });
//     }
// };

// // 2️⃣ FUNCTION: Online Order Initiation (Razorpay Order ID Generation)
// export const createOnlineOrder = async (req, res) => {
//     try {
//         const { userId, items, Address, totalAmount } = req.body; 

//         // Amount ko paise mein convert karna (Razorpay ki requirement)
//         const amountInPaise = Number(totalAmount) * 100;

//         const options = {
//             amount: amountInPaise,
//             currency: "INR",
//             receipt: `receipt_order_${Date.now()}`
//         };

//         // Razorpay API ko call karke Order ID banana
//         const razorpayOrder = await razorpayInstance.orders.create(options);

//         // Database mein Order ko 'Pending' status ke sath save karna
//         const newOrder = new Order({
//             userId,
//             items,
//             Address,
//             totalAmount,
//             paymentMethod: 'ONLINE',
//             razorpayOrderId: razorpayOrder.id, // Razorpay se mili ID (e.g., order_xyz)
//             paymentStatus: 'Pending'
//         });

//         await newOrder.save();

//         res.status(201).json({
//             success: true,
//             message: "Razorpay order initiated and saved in DB!",
//             order: razorpayOrder, // Yeh frontend ko popup kholne ke liye chahiye
//             dbOrderId: newOrder._id
//         });

//     } catch (error) {
//         console.log("Online Order Error:", error);
//         res.status(500).json({ success: false, message: "Online Order failed!", error: error.message });
//     }
// };

// // 3️⃣ FUNCTION: Payment Verification (Signature Verification after Payment)
// export const verifyPayment = async (req, res) => {
//     try {
//         const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//         // Validation data ko jodna
//         const sign = razorpay_order_id + "|" + razorpay_payment_id;
        
//         // Crypto se HMAC-SHA256 hash generate karna
//         const expectedSignature = crypto
//             .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//             .update(sign.toString())
//             .digest("hex");

//         // Signature check karna
//         const isAuthentic = expectedSignature === razorpay_signature;

//         if (isAuthentic) {
//             // Database mein order dhoodh kar use 'Success' mark karna
//             const updatedOrder = await Order.findOneAndUpdate(
//                 { razorpayOrderId: razorpay_order_id },
//                 {
//                     $set: {
//                         razorpayPaymentId: razorpay_payment_id,
//                         paymentStatus: 'Success',
//                         status: 'Order Placed Successfully'
//                     }
//                 },
//                 { new: true }
//             );

//             if (!updatedOrder) {
//                 return res.status(404).json({ success: false, message: "Order not found in database!" });
//             }

//             res.status(200).json({
//                 success: true,
//                 message: "Payment verified and Order completed successfully!",
//                 order: updatedOrder
//             });

//         } else {
//             res.status(400).json({ success: false, message: "Payment verification failed! Fake request detected." });
//         }

//     } catch (error) {
//         console.log("Verification Error:", error);
//         res.status(500).json({ success: false, message: "Verification failed!", error: error.message });
//     }
// };