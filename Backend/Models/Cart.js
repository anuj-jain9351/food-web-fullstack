import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User', 
        required:true
         
    },

    items:[{
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Food",
            required:true
        },
         
        quantity:{
            type:Number,
            default:1
        }
    }]
})


export default mongoose.model('cart',cartSchema);