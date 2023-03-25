const express = require('express')
const jwt=require("jsonwebtoken")
const bcrypt = require('bcrypt')
const {UserModel} = require('../models/user.model')
require('dotenv').config()

const userRoute = express.Router()
userRoute.use(express.json())

userRoute.post("/register",async (req,res)=>{
    const {userName,email,password,mobile}=req.body
    try{
        bcrypt.hash(password, 6, async (err, hash)=>{
            const user = new UserModel({userName,email,password:hash,mobile})
            await user.save()
            res.status(200).send({
                msg : "Registration Successfully Done"
            })
        });
    }catch(err){
        res.status(400).send({msg:err.message})
}})


userRoute.post("/login",async (req,res)=>{
    const {email,password}=req.body
    try{
        const user=await UserModel.findOne({"email" : email})
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
            if(result){
                const token = jwt.sign({ "userId": user._id }, process.env.JWT_Token);
                // console.log(user._id)
                res.status(200).send({msg:"Login Successfull","token":token})
            } else {
                res.status(400).send({msg : "Wrong Credientials"})
            }
        });
        } else {
            res.status(400).send({msg : "Wrong Credientials"})
        }
    } catch(err){
        res.status.send({msg:"Something went wrong", err: err.message})
    }
})



module.exports = {userRoute}
    