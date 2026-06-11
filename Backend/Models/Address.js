import mongoose from 'mongoose';

const Addressdetail = mongoose.Schema({
    userId:{
        type:String,
        required:true,
        ref:"User"
    },
    fullName:{
        type:String,
        required:true
    },
    phone:{
       type:Number,
       required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String, 
        required:true
    },
    pincode:{
        type:Number,
        required:true
    }
},{timestamps:true})


export default mongoose.model('address',Addressdetail)