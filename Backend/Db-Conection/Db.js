import mongoose from 'mongoose';

const dbconnect = async () => {
    try {
        // Humne process.env hata kar seedhe aapka live link daal diya hai
        await mongoose.connect("mongodb+srv://anujchandaliya935129:anuj1234@anujjain.dkta6am.mongodb.net/Food?retryWrites=true&w=majority&appName=AnujJain");
        console.log("DB Connected Successfully");
    } catch (error) {
        console.log("DB Not Connect", error);
    }
}

export default dbconnect;