import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import api from '../src/api/axios.js'
import { toast } from 'react-toastify'
const Navbar = () => {
  const navigate = useNavigate()
  const [userId, setUserId] = useState(localStorage.getItem('userId'))
  const [cartcount, setCartCount] = useState(0)
  const [searchParams, setSearchParams] = useSearchParams();

  const CartCount = async () => {
    if (!userId || userId === "null") {
      setCartCount(0)
      return
    }

    try {
      const response = await api.get(`/cart/showcart/${userId}`)
      const total = response.data?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0
      setCartCount(total)
    } catch (error) {
      console.error("Error fetching cart count:", error)
      setCartCount(0)
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    setUserId(null)
    setCartCount(0)
    toast.warn("Logged out successfully!")
    navigate('/')
  }

  const LoginHandler = () => navigate('/login')
  const signup = () => navigate('/signup')

  useEffect(() => {
    const checkUser = () => {
      const currentId = localStorage.getItem('userId')
      setUserId(currentId)
    }

    checkUser()
    CartCount()


    window.addEventListener('cartUpdate', CartCount)
    window.addEventListener('storage', checkUser)


    return () => {
      window.removeEventListener('cartUpdate', CartCount)
      window.removeEventListener('storage', checkUser)
    }
  }, [userId])


  const search = searchParams.get("search") || "";

  const handleSubmit = (e) => {
    setSearchParams({ search: e.target.value })
  }

  const homepage = () => {
    navigate('/')
  }

  return (
    <div className='flex justify-between items-center p-4 shadow-md  bg-white sticky top-0 z-50'>
      <div className='font-bold text-3xl cursor-pointer ' onClick={() => homepage()}>My Food</div>

      <div>
        <input
          type="text"
          value={search}
          onChange={handleSubmit}
          className='px-3 py-2 border rounded-lg w-full outline-none'
          placeholder='Search Food'
        />
      </div>

      <div className='flex items-center gap-4'>
        {/* Cart Icon */}
        <Link to={'/cart'} style={{ position: 'relative', display: 'inline-block', padding: '8px' }}>
          <span style={{ fontSize: '28px' }}>🛒</span>
          {cartcount > 0 && (
            <span style={{
              position: 'absolute',
              top: '0px',
              right: '0px',
              backgroundColor: '#ef4444',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: 'bold',
              boxShadow: '0 1px 2px rgba(0,0,0,0.15)'
            }}>
              {cartcount}
            </span>
          )}
        </Link>

        {/* FIX: Ab hum check kar rahe hain ki kya userId exist karti hai ya nahi */}
        {!userId || userId === "null" ? (
          <div className='flex gap-2'>
            <button onClick={LoginHandler} className='px-3 py-2 rounded bg-green-500 text-white font-medium hover:bg-green-600 transition'>Login</button>
            <button onClick={signup} className='px-3 py-2 rounded bg-blue-500 text-white font-medium hover:bg-blue-600 transition'>Signup</button>
          </div>
        ) : (
          <button onClick={handleLogout} className='px-3 py-2 rounded text-red-500 font-semibold hover:bg-red-50 transition'>Logout</button>
        )}
      </div>
    </div>
  )
}

export default Navbar