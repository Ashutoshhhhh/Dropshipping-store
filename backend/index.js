const express = require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser');
const bodyParser= require('body-parser')
dotenv.config();

if(!process.env.MONGO_URI){
    console.error("Mongo url is not defined in Env file");
    process.exit(1);
}

const app= express();
app.use(express.json({limit: "25mb"}));
app.use(express.urlencoded({limit: "25mb"}));
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}));




const authRoutes= require('./routes/userRoutes')
app.use('/api/auth',authRoutes);
const adminRoutes=require('./routes/adminRoutes')
app.use('/api/admin',adminRoutes);
const productRoutes=require('./routes/productRoutes')
app.use('/api/products',productRoutes);


async function startServer(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Mongo Connected');
        const port = process.env.PORT || 5000;
        app.listen(port,()=>console.log(`App is running on http://localhost:${port}`))
    }
    catch(err){
        console.log(`Error in connection to backend check mongo maybe ${err}`);
    }
}
startServer();