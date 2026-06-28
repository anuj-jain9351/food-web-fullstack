import React from 'react'
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router'
import Login from './Pages/Login.jsx'
import Home from './Pages/home.jsx'
import Signup from './Pages/Signup.jsx'
import AddItem from './admin/AddItem.jsx'
import ShowItem from './admin/ShowItem.jsx'
import FoodDetail from './Pages/FoodDetail.jsx'
import Cart from './Pages/Cart.jsx'
import UserDetail from './Pages/UserDetail.jsx'
import Chackout from './Pages/Chackout.jsx'
import { ToastContainer } from 'react-toastify'
import Success from './Pages/Success.jsx'
import ShowOrder from './Pages/ShowOrder.jsx'


function PrivateWrapper() {
  const isAuthenticated = localStorage.getItem('userId');

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}


const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/detail/:id', element: <FoodDetail /> },

  {
    element: <PrivateWrapper />,
    children: [
      { path: '/cart', element: <Cart /> },
      { path: '/userdetail', element: <UserDetail /> },
      { path: '/chackout', element: <Chackout /> },
      { path: '/success', element: <Success /> },
      { path: '/admin/additem', element: <AddItem /> },
      { path: '/admin/showitem', element: <ShowItem /> },
      {path:'/admin/order',element:<ShowOrder/>}
    ]
  }
])

const App = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
      <RouterProvider router={router} />
    </div>
  )
}
export default App
