import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar.jsx'
import api from '../api/axios.js'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
const UserDetail = () => {
  const navigate = useNavigate()
  const userId = localStorage.getItem('userId')
  const [detail, setDetail] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  })


  const handleChange = (e) => {
    setDetail({
      ...detail,
      [e.target.name]: e.target.value
    })
  }

  const setAddress = async() => {
    const response = await api.post('/address/add', {
      ...detail,
      userId
    })
    toast.success(response.data.message)
    navigate('/chackout')
  }

  return (
     <div>
      <Navbar/>
      <div className='max-w-lg  mx-auto mt-10  bg-white p-6 shadow-xl rounded '>
        <div>
          <h2 className=' flex justify-center text-2xl font-bold mb-6 '>
            User Detail Page</h2>
          {Object.keys(detail).map((e)=>(
            
          <input 
          key={e._id}
          type='text'
          name={e}
          onChange={handleChange}
          placeholder={e}
          className='w-full p-2 border border-gray-300 rounded my-1'/>
          ))}

          <button onClick={()=>setAddress()} type='submit' className=' w-full bg-green-500 px-4 py-2 mt-5 '>Save Address</button>
        </div>
      </div>
      </div>
  )
}

export default UserDetail
