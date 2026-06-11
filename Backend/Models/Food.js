import mongoose from 'mongoose';

const food = mongoose.Schema({
   
    name:{
    type:String,
    require:true
   },

   price:{
    type:Number,
    require:true
   },

   description:{
    type:String,
   },

   image:{
    type:String,
    require:true
   },

   category:{
    type:String
   },

   isAvailable:{
    type:Boolean,
    require:true
   }

});

export default mongoose.model('Food',food);
