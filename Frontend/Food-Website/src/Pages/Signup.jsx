import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import api from '../api/axios.js'

const Signup = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [msg, setMsg] = useState("")

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('/auth/signup', form)
      setMsg(response.data.message)
      setTimeout(() => {
        navigate('/')
      }, 1000);

    } catch (error) {
      console.log('server error', error)
      setMsg(error.response?.data?.message)
    }
  }

  return (
    <div className='flex justify-center h-screen bg-gray-100'>
      <div className=' flex flex-col justify-center gap-5   mt-20 items-center shadow-2xl  h-96 rounded-xl bg-white-500 w-80'>
        <h1 className='font-bold text-2xl'>Signup</h1>
        {msg && (
          <div className=' text-green-700 p-3 rounded mb-4 text-center font-bold'>{msg}</div>)}
        <form onSubmit={handleSubmit} className='space-y-4 flex flex-col justify-center  items-center  '>
          <label htmlFor="">Name</label>
          <input className='rounded p-2  border-2' name='name' type="text" value={form.name} onChange={handleChange} placeholder='Enter Name' />
          <input className='rounded p-2 border-2' name='email' type="text" value={form.email} onChange={handleChange} placeholder='Enter Email' />
          <input className='rounded p-2 border-2' name='password' type="password" value={form.password} onChange={handleChange} placeholder='Enter Password' />
          <button type='submit' className='bg-green-500 w-full border-none rounded'>Submit</button>
        </form>
      </div>

    </div>
  )
}

export default Signup 
