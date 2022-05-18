const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

module.exports = (req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization)res.send("login in first");

    const token = authorization.replace('Bearer ','');
    jwt.verify(token,'my_code',async (err,payload)=>{
        if(err)res.send("login in first");
        console.log(payload);
        const userId = payload.userId;
        const user = await User.findById(userId);
        console.log(user);
        req.user = user;
        console.log(req.user.email);
        next();
        
    })
}