import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import api from '../api/axios.js'
const Login = () => {
  const navigate = useNavigate()
  const [login, setLogin] = useState({
    email: "",
    password: ""
  })

  const [msg, setMsg] = useState("")


  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  }
const handleSubmit = async (e) => {
  try {
    e.preventDefault();
    const response = await api.post('/auth/login', login);
    
    setMsg(response.data.message);
    console.log("Backend Response:", response.data);

    const userId = response.data.userId
    
    if (userId) {
      localStorage.setItem("userId", userId);
      console.log("ID successfully saved to localStorage:", userId);
    } else {
      console.log("Error: Backend se user ID nahi mili! Check response structure.");
    }

    setTimeout(() => {
      navigate('/');
    }, 1000);

  } catch (error) {
    console.log('Error during login:', error);
    setMsg(error.response?.data?.message || "Login failed");
  }
}
  return (
    <div className=' flex justify-center h-screen bg-gray-100'>
      <div className=' flex flex-col justify-center gap-5   mt-20 items-center shadow-2xl  h-96 rounded-xl bg-white-500 w-80'>
        <h1 className='font-bold text-2xl'>Login to Your Account</h1>
        {msg && (
          <div className='text-green-700 p-3 rounded mb-4 text-center font-bold'>{msg}</div>)}
        <form onSubmit={handleSubmit} className='space-y-4 flex flex-col justify-center  items-center  '>
          <input className='rounded p-2 border-2' type="text" name="email" value={login.email} onChange={handleChange} placeholder='Enter Email' />
          <input className='rounded p-2 border-2' type="text" name="password" value={login.password} onChange={handleChange} placeholder='Enter Password' />
          <button className='bg-green-500 w-full border-none rounded' type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
