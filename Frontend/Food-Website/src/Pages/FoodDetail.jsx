import React from 'react'
import { useState } from 'react'
import {useParams} from 'react-router'
import api from '../api/axios.js'
import { useEffect } from 'react'
import Navbar from '../../Components/Navbar.jsx'
const FoodDetail = () => {
const {id} = useParams()
  const [details,setDetails] = useState(null);

  const detail = async()=>{
    try{
      const response = await api.get(`/food/detail/${id}`)
       setDetails(response.data.data)
    }catch(error){
      console.log("Error => ",error)
    }
  }

  

  useEffect(()=>{
    if(id){
   detail()
    }
  },[id])
if(!details){
  return(
    <div className='m-5 flex justify-center items-center p-5'>Loding...</div>
  )
}

  return (
    <div>
      <Navbar/>
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 rounded-lg shadow-md border">
       <div className="flex justify-center items-center bg-gray-50 rounded-lg p-4">
         <img src={details.image} alt={details.name} className='max-h-96 object-contain rounded transform hover:scale-105 transition-transform duration-300' />
       </div>

       <div className="flex flex-col justify-between">
        <div>
          <span className="bg-orange-100 text-orange-600 text-sm font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            {details.category}
          </span>
          <h1 className="text-3xl font-bold text-gray-800 mt-3">{details.name}</h1>
          <p className="text-2xl font-semibold text-green-600 mt-2">{details.price}</p>
          
          
          <div className='mt-4'>
            {details.isAvailable ? (
              <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded">Available</span>

            ):(
              <span className="text-sm text-red-600 font-medium bg-red-50 px-2 py-1 rounded">Out of Stock</span>
            )}

          </div>

          <hr className="my-5 border-gray-200" />

          <h3 className="text-lg font-bold text-gray-700">Description:</h3>
          <p className="text-gray-600 mt-1 leading-relaxed">{details.description}</p>
        </div>
        
       </div>
      </div>
        
      
    </div>
    </div>
  )
}

export default FoodDetail
