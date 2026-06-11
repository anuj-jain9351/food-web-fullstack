import express from "express";
import {cartschema,removeCart,updateCart,ShowCart} from '../Controllers/CartControllers.js';

const app = express.Router()

app.post('/addcart',cartschema);
app.post('/removecart',removeCart);
app.post('/updateCart',updateCart);
app.get('/showcart/:userId',ShowCart); 


export default app