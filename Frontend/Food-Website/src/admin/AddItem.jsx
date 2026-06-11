import React, { useState } from 'react'
import api from '../api/axios.js'
import { useNavigate } from 'react-router'
const AddItem = () => {

  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
    isAvailable: ""
  })

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await api.post('/food/addfood', data);
    console.log(response)
    alert("Food Item Add Successfully");
    navigate('/admin/showitem');
  }


  return (
    <div className='max-w-lg  mx-auto mt-10  bg-white p-6 shadow-xl rounded '>
      <div>
        <h2 className=' flex justify-center text-2xl font-bold mb-6 '>add item</h2>
        <form onSubmit={handleSubmit} className='space-3'>
          {Object.keys(data).map((e) => (
            <input type="text"
              key={e}
              name={e}
              onChange={handleChange}
              value={data[e]}
              placeholder={e}
              className='w-full p-2 border bordergray-300 rounded' />
          ))}
          <button type='submit' className=' w-full bg-green-500 px-4 py-2 mt-5 '>Add Item</button>

        </form>
      </div>
    </div>
  )
}

export default AddItem
