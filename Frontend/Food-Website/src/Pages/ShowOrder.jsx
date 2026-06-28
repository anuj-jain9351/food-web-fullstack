import React, { useEffect, useState } from 'react'
import api from '../api/axios.js'
import { toast } from 'react-toastify';

const ShowOrder = () => {
    const [items, setItems] = useState([]);

    const checking = async () => {
        try {
            const response = await api.get('/order/show-product')
            setItems( response.data.order)
            // console.log(response.data)

        } catch (error) {
            console.log("Error=>", error)
            toast.error("Order Are Empty And Backend Not Worring ")
        }
    }

    useEffect(() => {
        checking()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 p-6 font-sans">
            <div className='mb-8'>
            <h1 className='text-3xl font-black text-gray-800 tracking-wide uppercase'>ADMIN ORDER DASHBOARD</h1>
            </div>

                    {/* Header Price Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 border-b border-t border-gray-200 py-6">

                <div className='flex flex-col'>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Orders</span>
                    <span className="text-3xl  text-gray-800 mt-1">{items.length}</span>
                </div>

                <div className="flex flex-col border-l-0 md:border-l border-gray-200 md:pl-6">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Revenue</span>
                    <span className="text-3xl  text-gray-800 mt-1">₹{items.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0).toLocaleString('en-IN')}</span>
                </div>

                <div className="flex flex-col border-l-0 md:border-l border-gray-200 md:pl-6">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">New Orders</span>
                    <span className="text-3xl  text-gray-800 mt-1">{items.length > 0 ? 2 : 0}</span>
                </div>
            </div>


            {/* TABLE STRUCTURE */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                  
                  <thead>
                      <tr className="bg-gray-100 border-b border-gray-200 text-xs font-bold text-gray-700 uppercase tracking-wider">
                          <th className="p-4 w-32">Order ID</th>
                          <th className="p-4 w-44">Payment Method</th>
                          <th className="p-4 w-64">Address</th>
                          <th className="p-4">Items Ordered</th>
                          <th className="p-4 w-36 text-right">Total Price</th>
                          <th className="p-4 w-40 text-center">Status</th>
                      </tr>
                  </thead>
    
    {/* main data  */}
                  <tbody className="divide-y divide-gray-200 text-sm text-gray-600">
{items.length === 0 ? (
    <tr>
        <td colSpan="6" className="p-8 text-center text-gray-400 font-medium">
            Abhi tak koi bhi order received nahi hua hai.
        </td>
    </tr>
) : (
    items.map((order) => (
        <tr key={order._id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
            
            <td className="p-4 font-mono font-medium text-blue-600 hover:underline cursor-pointer">
                #{order._id ? order._id.slice(-6).toUpperCase() : 'N/A'}
            </td>
            
            <td className="p-4">
                <div className={`flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-semibold w-max ${
                    order.paymentMethod === 'ONLINE' || order.paymentMethod === 'Online Paid'
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                        order.paymentMethod === 'ONLINE' || order.paymentMethod === 'Online Paid' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></span>
                    {order.paymentMethod === 'ONLINE' || order.paymentMethod === 'Online Paid' ? 'Online Paid' : 'Cash on Delivery'}
                </div>
            </td>

            <td className="p-4 max-w-xs truncate text-gray-500">
                {order.address || "301, Near Main Market, New Delhi"}
            </td>

            <td className="p-4">
                <ul className="list-disc list-inside space-y-0.5 text-xs text-gray-700">
                    {order.items && Array.isArray(order.items) ? (
                        order.items.map((item, idx) => (
                            <li key={idx}>
                                {item.quantity} x {item.productId?.name || "Delicious Food Item"}
                            </li>
                        ))
                    ) : (
                        <li>1 x Special Burger, 1 x Coke</li>
                    )}
                </ul>
            </td>

            <td className="p-4 text-right font-semibold text-gray-800">
                ₹{(order.totalAmount || 0).toLocaleString('en-IN')}
            </td>

            <td className="p-4 text-center">
                <span className={`inline-block px-3 py-1 rounded text-xs font-bold tracking-wide uppercase shadow-sm ${
                    order.status === 'Delivered' 
                        ? 'bg-emerald-800 text-white' 
                        : order.status === 'In Transition'
                        ? 'bg-amber-700 text-white'
                        : 'bg-orange-500 text-white' 
                }`}>
                    {order.status || 'Processing'}
                </span>
            </td>

        </tr>
    ))
)}
                  </tbody>

              </table>
          </div>
      </div>
        </div>
    )
}

export default ShowOrder
