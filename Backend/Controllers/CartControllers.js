import express from 'express';
import cart from '../Models/Cart.js';

export const cartschema = async (req, res) => {
    try {
        const {userId,productId} = req.body;

        let Cart = await cart.findOne({userId}) 
        if(!Cart){
           Cart =  new cart({
                userId,
                items:[{
                    productId,
                    quantity:1
                }]
            })
        }
        else{
            const item = Cart.items.find(i=>i.productId === productId)
            if(item){
                item.quantity += 1 
            }else{
                Cart.items.push({productId,quantity:1})
            }
           
        }

        await Cart.save()
        res.status(200).json({message:"Cart add Successfully"}) 
    } catch (error) {
        res.status(500).json({ message: "Server Error", error })
        console.log(error.message)
    }
}

export const removeCart = async(req,res)=>{
    try{
        const {userId,productId} =  req.body;
        let Cart = await cart.findOne({userId})
        if(!Cart){
            res.status(404).json({message:"Cart not found"})
        }
            Cart.items = Cart.items.filter(i=>i.productId.toString() !== productId)
            await Cart.save()
            res.status(200).json({message:"Item Delete Successfully"})
        


    }catch(error){
        res.status(500).json({message:"Server Error",error})
        console.log(error.message)

    }

}

export const updateCart = async(req,res)=>{
    try{
        const {userId,productId,quantity} = req.body;
        const Cart = await cart.findOne({userId});
        if(!Cart){
           return res.status(404).json({message:"Cart not found"})
        }

        const item = Cart.items.find(i=>i.productId.toString() === productId)
        
        if(!item){
            return res.status(404).json({message:"Product not defind"})
        }

        item.quantity = quantity

        await Cart.save()
        res.status(200).json({message:"Cart Update Successfully"})

    }catch(error){
        res.status(500).json({message:"Server Error",error})
        console.log(error.message)
    }
}


export const ShowCart = async(req,res)=>{
    try{
        const {userId} = req.params;

        let Cart = await cart.findOne({userId}).populate("items.productId");

        if(!Cart){
            return res.status(404).json({message:"Cart Not Found"})
        }

        await res.status(200).json(Cart)
        

    }catch(error){
        res.status(500).json({message:"Server Error",error})
        console.log(error.message)
    }
}