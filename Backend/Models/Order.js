import mongoose from 'mongoose';

const Order = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true

    },

    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Food',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],

    Address: {
        fullName: String,
        phone: Number,
        address: String,
        city: String,
        state: String,
        pincode: Number
    },

    totalAmount: {
        type: Number
    },

    status: {
        type: String,
        default: "Order Place Successfully"
    },

    paymentMethod: {
        type: String,
        default: 'COD'
    },

    razorpayOrderId: {
        type: String,
        default: ""
    },

    razorpayPaymentId: {
        type: String,
        default: ""     

    },

    paymentStatus: {
        type: String,
        enum: ['pending', 'success', 'Failed'],
        default: 'pending'
    }

},
    {
        timestamps: true
    }
)

export default mongoose.model('Order', Order);