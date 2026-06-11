import React from 'react'
import { useState } from 'react'
import api from '../api/axios.js'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import Navbar from '../../Components/Navbar.jsx'
const Cart = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useState(null)

  const Showcart = async () => {
    try {
      const userId = localStorage.getItem('userId')
      const response = await api.get(`/cart/showcart/${userId}`)
      setCart(response.data)
    } catch (error) {
      console.log("Error => ", error)

    }

  }

  const removecart = async(productId)=>{
    try{
      const userId = localStorage.getItem('userId')
    const response = await api.post('/cart/removecart',{userId,productId})
    Showcart()
      
    }catch(error){
      console.log("Error =>",error)

    }
  }

  const updatecart = async(productId,quantity)=>{
    if(quantity === 0){
      removecart(productId)
      navigate('/')
    }
    const userId = localStorage.getItem('userId')
    try{
      const response = await api.post('/cart/updateCart',{userId,productId,quantity})
      Showcart()
      
    }catch(error){
      console.log("Error =>",error)

    }

  }
  
  const userdetail = ()=>{
    navigate('/userdetail')
    
  }

  useEffect(() => {
    Showcart()
  }, [])

  
  const total = cart && cart.items.reduce((sum,item)=> sum + item.productId.price * item.quantity,0)
  return (
   <div>
    <Navbar/>
    <div className='max-w-4xl mx-auto p-6 '>
      <h1 className='text-2xl font-bold mb-6'>Your Cart</h1>
      <div className='space-y-4'>
      {cart && cart.items.map((e)=>(
        <div key={e.productId._id} className='flex items-center justify-evenly p-4  rounded border'>
          <div className='flex items-center gap-4'>
          <img src={e.productId.image} alt={e.productId.name} className='w-16 h-16 object-cover rounded' />
          <div>
            <h2 className='text-lg font-semibold'>{e.productId.name}</h2>
            <p className='text-gray-600'>{e.productId.price}</p>
          
          </div>
          </div>
          <div className='flex items-center  gap-2'>
            <button onClick={()=>updatecart(e.productId._id,e.quantity - 1)} className='px-2 py-1 bg-gray-200 rounded'>-</button>
            <span>{e.quantity}</span>
            <button onClick={()=>updatecart(e.productId._id,e.quantity + 1)} className='px-2 py-1 bg-gray-200 rounded'>+</button>
          </div>
          <div>
            <p className='font-semibold'>{e.productId.price * e.quantity}</p>
          </div>

          <button onClick={()=>removecart(e.productId._id)}  className='text-red-500'>Remove</button>
        </div>
      ))}
      <div className='text-right mt-4'>
        <h2 className='text-xl font-bold'>Total: {total}</h2>
      </div>

      <div className='mt-10  flex justify-center items-center'>
        <button onClick={()=>userdetail()} className='bg-green-500 border  px-3 py-2 rounded'>Process To ChackOut</button>
      </div>
 </div>

         </div>
         </div>
         
  )
}

export default Cart
