import express from 'express';
import { Signup,Login } from '../Controllers/UserControllers.js';


const app = express()

app.post('/signup',Signup)
app.post('/login',Login)

export default app