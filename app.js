const express=require("express");

const routes = require('./routes'); 
const app=express();
app.use(express.json());



const PORT =5000;
app.use('/api', routes); 




app.listen(PORT,()=>console.log(`server is runing on port ${PORT}`))
