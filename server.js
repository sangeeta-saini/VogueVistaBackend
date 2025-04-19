import express from 'express'
import env from 'dotenv';


env.config()

import productRoutes from './routes/productDescription.js'
import ordersRoutes from './routes/orders.js'
import profileRoutes from './routes/profile.js'
import UserRoutes from './routes/user.js'
import AddBagRoutes from './routes/addBag.js'
import FilterProductRoutes from './routes/filterProduct.js'
import WishlistRoutes from './routes/wishlist.js'

import path from 'path';

const port = process.env.PORT || 8000;
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


  
app.use('/user' , UserRoutes)
app.use('/sproduct', productRoutes);
app.use('/order', ordersRoutes);
app.use('/file', profileRoutes);
app.use('/cart', AddBagRoutes);
app.use('/filter' ,FilterProductRoutes );
app.use('/wishList' , WishlistRoutes)


const dbURL = "mongodb://localhost:27017/dbconnect"
mongoose.connect(dbURL).then((result)=>{
    console.log('connection is sucessful')
}).catch((error)=>{
    console.log('there is an error');
})
console.log('something is happing here');




app.listen(port, () => console.log(`server is running on port http://localhost:${port}`))