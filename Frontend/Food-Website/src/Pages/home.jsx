import React, { useEffect, useState } from 'react'
import api from '../api/axios.js';
import { Link, useSearchParams } from 'react-router';
import { useNavigate } from 'react-router';
import Navbar from '../../Components/Navbar.jsx';
import { toast } from 'react-toastify';
const home = () => {
  const userId = localStorage.getItem('userId')
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams()

  const search = searchParams.get("search") || ""

  const showdata = async () => {
    const response = await api.get(`/food/allfood?search=${search}`)
    setData(response.data.data)
  }



  const cart = async (productId) => {
    const response = await api.post('/cart/addcart', { userId, productId });
    toast.success(response.data.message)

    window.dispatchEvent(new Event('cartUpdate'))
  }

  useEffect(() => {
    showdata()
  }, [search])

  return (

    <div>
      <Navbar />
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-5'>
        {/* <Navbar/>  */}
        {data.map((e) => (
          <div key={e._id} className='border p-3 rounded shadow hover:shadow-lg transition flex flex-col mx-5'>
            <Link to={`/detail/${e._id}`}>
              <img src={e.image} alt={e.name} className='w-full h-40 object-contain mb-2 p-2' />
            </Link>
            <h1 className='font-bold text-center'>{e.name}</h1>
            <p className='font-semibold text-center text-green-600'>${e.price}</p>
            <button onClick={() => cart(e._id)} className='mt-auto w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition'>Add To Cart</button>

          </div>

        ))}


      </div>
    </div>
  )
}

export default home
