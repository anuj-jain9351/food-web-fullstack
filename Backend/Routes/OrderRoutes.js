import express from 'express'
import {setOrder,OnlineOrder,verifyPayment} from '../Controllers/OrderControllers.js'

const app = express.Router()

app.post('/place',setOrder);
app.post('/Order',OnlineOrder);
app.post('/payment',verifyPayment);



export default app;
  