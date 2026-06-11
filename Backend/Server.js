import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors'
import dbconnect from './Db-Conection/Db.js';
import userRoute from './Routes/UserRoutes.js';
import foodRoute from './Routes/FoodRoutes.js';
import cartRoute from './Routes/CartRoutes.js';
import AddressRoute from './Routes/Addressroute.js';
import OrderRoute from './Routes/OrderRoutes.js';

const app = express()
dotenv.config()

app.use(express.json())  
app.use(cors())
app.use('/api/auth', userRoute);
app.use('/api/food', foodRoute);
app.use('/api/cart', cartRoute);
app.use('/api/address', AddressRoute);
app.use('/api/order', OrderRoute);

app.get('/', (req, res) => {
    res.send("Server Started  Successfully")
})

dbconnect()

app.listen(5000)