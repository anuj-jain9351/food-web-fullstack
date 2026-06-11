import Food from '../Models/Food.js';

export const addFood = async(req,res)=>{
    try{
        const {name,price,description,image,category,isAvailable} =  req.body

        const newfood = new Food({
            name,
            price,
            description,
            image,
            category,
            isAvailable
        })

        await newfood.save();
        res.status(200).json({message:"Food Item Add Successfully"});

    }catch(error){
        res.status(500).json({message:"Server Error",error})
        console.log(error)
    }
}


export const getAllFood = async(req,res)=>{
    try{
const {search} = req.query;
      let filter = {}
      if(search){
        filter.name = {$regex:search,$options:'i'}
      }
      
        const foods = await Food.find(filter).sort({cheatedAt: -1});
        res.status(200).json({message:true, data:foods})

    }catch(error){
        res.status(500).json({message:"Server Error",error})
        console.log(error)
    }

}

export const removeFood = async(req,res)=>{
    try{
      const {id} = req.params;
      await Food.findByIdAndDelete(id);
      res.status(200).json({message:"Food item delete"})

    }catch(error){
        res.status(500).json({message:"Server Error",error})
        console.log(error)
    }
}


export const detaile = async(req,res)=>{
try{
    const {id} = req.params;
    const fooddata = await  Food.findById(id);
    res.status(200).json({success:true,data:fooddata})

}catch(error){
    res.status(500).json({message:"Server Error"})
}
} 
