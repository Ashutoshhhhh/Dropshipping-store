const express = require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();

if(!process.env.MONGO_URI){
    console.error("Mongo url is not defined in Env file");
    process.exit(1);
}

const app= express();
app.use(express.json());
app.use(cors());







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