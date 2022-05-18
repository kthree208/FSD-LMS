const mongoose = require('mongoose');
const express = require('express');
const User = mongoose.model('User');
const Fine = mongoose.model('Fine');
const jwt = require('jsonwebtoken');

const route = express.Router();

route.post('/signup',async (req,res)=>{
    const {name,email,password,role} = req.body;

    if(!email || !password || !name)return res.status(422).send("Invalid Email or password ")
    
    try{
    const user = new User({name,email ,password,role});
    
    await user.save();
    const fine = new Fine({userId:user._id,fine:0});
    await fine.save();
    const token = jwt.sign({userId :user._id},'my_code');
    res.send({token});
    }
    catch (err){
        console.log(err);
        return res.status(422).send("email already registered");
    }
})

route.post('/signin',async (req,res)=>{
    const {email,password}=req.body;
    if(!email || !password)return res.status(422).send("invalid email or passwrd");

    const user = await User.findOne({email});
    if(!user)return res.status(422).send("invalid email or passwords");
    console.log('loged nr');
    try{
    await user.comparePasswords(password);
    const token = jwt.sign({userId:user._id},'my_code');
    return res.send({user,token});
    }
    catch(err){
        console.log(err);
    }
})

module.exports = route;