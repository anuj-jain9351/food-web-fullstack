import express from 'express'
import {setOrder,OnlineOrder,verifyPayment,getAllOrderForAdmin} from '../Controllers/OrderControllers.js'


const app = express.Router()

app.post('/place',setOrder);
app.post('/Order',OnlineOrder);
app.post('/payment',verifyPayment);
app.get('/show-product',getAllOrderForAdmin);
export default app;
  