require('./Models/User');
require('./Models/fine');
require('./Models/issued');
require('./Models/returned')
require('./Models/books');
require('./Models/request');
const express = require('express');
const mongoose = require('mongoose');
const route = require('./Routes/authRoutes');
const bodyparse = require('body-parser');
const requireAuth = require('./Routes/requireAuth');
const authCheck = require('./midleware/authcheck');
const userRoutes = require('./Routes/userRoutes')
const cors = require('cors');
const app = express();


app.use(bodyparse.json());
app.use(cors());

app.use(route);
app.use(userRoutes);

const dbUri = 'mongodb+srv://k3mongo:k3mongo@cluster0.2laxi.mongodb.net/library?retryWrites=true&w=majority'
mongoose.connect(dbUri);


// app.get('/',authCheck,(req,res)=>{
//     res.send(`your email :${req.user.email}`);    
// })

app.listen(3500,()=>{
    console.log("server started at port 3500");
})


mongoose.connection.on('connected',()=>{
    console.log("connected to mongo");
})

mongoose.connection.on('disconnected',()=>{
    console.log("disconnected from mongo");
})

mongoose.connection.on('error',(err)=>{
    console.error(err);
})
