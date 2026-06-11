import { useEffect } from 'react'
import api from '../api/axios.js'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Navbar from '../../Components/Navbar.jsx'
import { useNavigate } from 'react-router'

const Chackout = () => {
  const navigate = useNavigate()
  const userId = localStorage.getItem('userId')
  const [selectd, setSelectd] = useState([]);
  const [selectAddress, setSelectAddress] = useState(null)
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [paymentMethod,setPaymentMethod] = useState("COD");

  const showdetail = async () => {
    const response = await api.get(`/address/${userId}`)

    setSelectd(response.data.response)

  }

  const cartcount = async () => {
    const response = await api.get(`/cart/showcart/${userId}`)

    const items = response.data?.items
    setCart(items)

    const total = items.reduce((sum, i) => sum + i.quantity * i.productId.price, 0);
    setTotalAmount(total)

    const charge = total / 10
    setDelivery(charge)

    const subtotalprice = total + charge
    setSubtotal(subtotalprice)

  }

  const handlesubmit = async () => {

    if(!selectAddress){
      return toast.error("please select a Delivery address!")
    }

    const OrderItem = cart.map((i)=>(
      {
        productId : i.productId._id,
        quantity:i.quantity,
        price:i.productId.price
      }
    ))
  try{

    // case on delivery
    if(paymentMethod === 'COD'){
      const Order = {
        userId : userId,
        items:OrderItem,
        totalAmount:subtotal,
        selectAddress:`${selectAddress.address},${selectAddress.city},${selectAddress.state} - ${selectAddress.pincode}`
      }

      const response = await api.post('/order/place',Order)
        
      toast.success(response.data.message)
      
      navigate('/success',{state:{orderId:response.data.orderId}})
    }

    // Online delivery
    
    else{
      const OnlineOrder = {
        userId:userId,
        items:OrderItem,
        totalAmount:subtotal,
        selectAddress:`${selectAddress.address},${selectAddress.city},${selectAddress.state} - ${selectAddress.pincode}`
      }

      const response = await api.post('/order/Order',OnlineOrder)
      const {order,orderId} = response.data;


      // razorpay Popup

      const options = {
        key: 'rzp_test_Swl5UbIxJz6B90',
        amount:order.amount,
        currency:order.currency,
        name: "Food Ordering App",
        description:"Secure Payment Gateway",
        order_id:order.id,

        // After Successfull Payment

        handler: async function(razorpayResponse){
          try{
            const verifyData = {
              razorpay_order_id:razorpayResponse.razorpay_order_id,
              razorpay_payment_id:razorpayResponse.razorpay_payment_id,
              razorpay_signature:razorpayResponse.razorpay_signature,
              orderId:orderId
            }

            const varifyResponse = await api.post('/order/payment',verifyData)

            if(varifyResponse.data.success){
              toast.success("Payment Varified & Order Placed");
              navigate('/success',{state:{orderId:orderId}})
            }

          }catch(error){
            console.log("Error=>",error)
            toast.error("Payment Verification Failed!");
          }
        },

        prefill:{
          name:selectAddress?.fullName || "User Name",
          contact:selectAddress?.phone || "9999999999"
        },

        theme:{
          color:'#22c55e'
        }
        
      };

      const rzp = new window.Razorpay(options);

      rzp.open();
    }

  }catch(error){
    console.log("Error =>",error)
    toast.error("Something went wrong")

  }
    
  }

  useEffect(() => {
    showdetail()
    cartcount()
  }, [])


  return (
    <div className='bg-gray-50 min-h-screen pb-10'>
      <Navbar />
      <div className='max-w-4xl mx-auto mt-10 p-4'>
        <h1 className='text-3xl font-bold mb-6 text-gray-800'>Cheour</h1>

        <div className=' bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6'>

          <h2 className='text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2'>Select Address</h2>

          <div>
            {selectd.slice().reverse().slice(0, 2).map((e) => (
              <div
                key={e._id}
                className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition ${selectAddress?._id === e._id ? 'border-blue-500 bg-blue-50/30' : 'border-gray-200 hover:bg-gray-50'
                  }`}>

                <input
                  type="radio"
                  name="checkout"
                  checked={selectAddress?._id === e._id}
                  onChange={() => setSelectAddress(e)}
                  className='mt-1 w-4 h-4 text-blue-600'
                />
                <div>
                  <h3 className='font-bold text-gray-800 capitalize'>{e.fullName}</h3>
                  <p className='text-gray-600 text-sm mt-1'>{e.address},{e.city},{e.state} - {e.pincode}</p>
                  <p className='text-gray-500 text-sm mt-1 font-medium'>PhoneNo: {e.phone}</p>

                </div>
              </div>
            ))}
          </div>
        </div>


                <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6'>

                    <h2 className='text-lg font-semibold text-gray-700 mb-4'>Select Payment Method</h2>

                    <div className='flex flex-col sm:flex-row gap-4'>



                        <label className={`flex-1 flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition ${paymentMethod === 'COD' ? 'border-green-500 bg-green-50/20' : 'border-gray-200'}`}>

                            <input

                                type="radio"

                                name="payment_method"

                                value="COD"

                                checked={paymentMethod === 'COD'}

                                onChange={(e) => setPaymentMethod(e.target.value)}

                                className='w-4 h-4 text-green-600'

                            />

                            <div>

                                <span className='font-bold text-gray-800 block'>Cash on Delivery (COD)</span>

                                <span className='text-xs text-gray-500'>Pay when order delivers</span>

                            </div>

                        </label>



                        <label className={`flex-1 flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition ${paymentMethod === 'ONLINE' ? 'border-green-500 bg-green-50/20' : 'border-gray-200'}`}>

                            <input

                                type="radio"

                                name="payment_method"

                                value="ONLINE"

                                checked={paymentMethod === 'ONLINE'}

                                onChange={(e) => setPaymentMethod(e.target.value)}

                                className='w-4 h-4 text-green-600'

                            />

                            <div>

                                <span className='font-bold text-gray-800 block'>Pay Online (Razorpay)</span>

                                <span className='text-xs text-gray-500'>UPI, Cards, NetBanking</span>

                            </div>

                        </label>



                    </div>

                </div>



        <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
          <h2 className='text-lg font-semibold text-gray-700 mb-4'>Order Summary</h2>

          <div className='border-b border-gray-100 pb-4 space-y-2 text-sm text-gray-600'>
            <div className='flex justify-between'>
              <span>Total</span>
              <span className='text-green-600 font-medium'>{totalAmount}</span>
            </div>
            <div className='flex justify-between'>
              <span>Delivery Charges</span>
              <span className='text-green-600 font-medium'>{delivery}</span>
            </div>
            <div className='flex justify-between'>
              <span>Subtotal</span>
              <span className='text-green-600 font-medium'>{subtotal}</span>
            </div>
          </div>

          <div className='flex justify-between items-center py-4 text-xl font-bold text-gray-900'>
            <span>Total Amount</span>
            <span></span>
          </div>

          <button
            onClick={() => handlesubmit()}

            className='w-full text-center font-bold bg-green-500 px-3 mt-5 py-3 rounded-xl shadow-md transition'>Place Order</button>

          <p className='text-center text-xs text-gray-400 mt-3'>Payment Gateway</p>
        </div>


      </div>

    </div>
  )
}

export default Chackout