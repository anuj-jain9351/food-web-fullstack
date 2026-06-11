import express from 'express';
import { addFood, getAllFood, removeFood,detaile} from '../Controllers/FoodControllers.js'

const app = express()

app.post('/addfood', addFood);
app.get('/allfood', getAllFood);
app.delete('/removefood/:id', removeFood);
app.get('/detail/:id',detaile)

export default app