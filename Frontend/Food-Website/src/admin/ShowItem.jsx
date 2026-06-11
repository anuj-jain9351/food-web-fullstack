import React, { useEffect, useState } from 'react'
import api from '../api/axios.js'
import {useNavigate} from 'react-router'

const ShowItem = () => {

  const navigate = useNavigate();
  const [data, setData] = useState([])


  const foods = async () => {
    const response = await api.get('/food/allfood')
    setData(response.data.data)
    console.log(response.data.data)
  }


  const deletes = async (id) => {
    const response = await api.delete(`/food/removefood/${id}`)
    foods()

  }

  const additem = ()=>{
    navigate('/admin/additem')
  }

  useEffect(() => {
    foods()
  }, [])

  return (
    <div className='max-w-4xl mx-auto mt-10 px-4'>
      <div className='flex justify-between items-center mb-10'>
        <h2 className='text-2xl font-bold'>Item List</h2>
        <button onClick={()=>additem()} className='border rounded py-2 px-3 bg-green-500'>Add Item</button>
      </div>
      <div className="overflow-x-auto ">
        <table className='w-full border-collapse border border-gray-300'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='border border-gray-300 px-4 py-2 text-left'>Name</th>
              <th className='border border-gray-300 px-4 py-2 text-left'>Price</th>
              <th className='border border-gray-300 px-4 py-2 text-left'>category</th>
              <th className='border border-gray-300 px-4 py-2 text-left'>Available</th>
              <th className='border border-gray-300 px-4 py-2 text-left'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((e) => (
              <tr
                key={e._id}
                className="hover:bg-gray-50"
              >
                <td className='border border-gray-300 px-4 py-2'>{e.name}</td>
                <td className='border border-gray-300 px-4 py-2'>{e.price}</td>
                <td className='border border-gray-300 px-4 py-2'>{e.category}</td>
                <td className='border border-gray-300 px-4 py-2'>
                  {e.isAvailable ? (
                    <span className="text-green-600 bg-green-100 px-2 py-1 rounded text-xs">Yes</span>
                  ) : (
                    <span className="text-red-600 bg-red-100 px-2 py-1 rounded text-xs">No</span>
                  )}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  <button className='text-red-500 font-semibold  ' onClick={() => deletes(e._id)}>Remove Item</button>
                </td>
              </tr>
            ))}


          </tbody>
        </table>

      </div>

    </div>
  )
}

export default ShowItem
