import express from 'express';
import {setorder,getorder} from '../Controllers/AddressControllers.js'

const app = express.Router()

app.post('/add',setorder);
app.get('/:userId',getorder);   

export default app   