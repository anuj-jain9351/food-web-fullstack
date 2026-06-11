import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import api from '../api/axios.js'

const Success = () => {
  const location = useLocation();
  const orderId = location.state?.orderId
  const navigate = useNavigate()
  const [id, setId] = useState()




  useEffect(() => {

    if (!orderId) {
      navigate('/', { replace: true });
      return;
    }

    setId(orderId)
  }, [orderId, navigate])


  if (!orderId) {
    return null;
  }

  const handleSubmit = () => {
    navigate('/')
  }


  return (
    <div className=' w-full px-3 py-2'>
      <div className='w-full flex h-20 flex-col justify-center items-center bg-green-500  rounded shadow-md  '>
        <h1 className='font-bold text-xl'>Oredr Successfull Submitad</h1>

      </div>
      <p className='font-bold text-xl mt-5'>Your Order Id : {id}</p>
      <div>
        <button onClick={() => handleSubmit()} className=' flex justify-center w-full rounded items-center mt-5 bg-blue-600 px-3 py-2 text-white font-bold text-xl red-500'>Continue TO Shopping</button>
      </div>
    </div>
  )
}

export default Success
