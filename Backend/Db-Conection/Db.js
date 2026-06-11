import mongoose from "mongoose";

const dbconnect = async()=>{
    try{
        await mongoose.connect(process.env.mongo_uri)
        console.log("DB Connect")
        
    }catch(error){
        console.log("DB Not Connect",error)
    }
}

export default dbconnect;