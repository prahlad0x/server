//Notes.route.js
const jwt = require("jsonwebtoken");
const express=require("express")
const {NoteModel}=require("../models/note.model")
const notesRouter=express.Router()
require('dotenv').config()

notesRouter.get("/",async(req,res)=>{
    const token=req.headers.authorization.split(" ")[1]
    const decoded=jwt.verify(token,process.env.JWT_Token)
    try{
        if(decoded){
            const notes=await NoteModel.find({"userId":decoded.userId})
            res.status(200).send(notes)
        }
    } catch(err){
        res.status(400).send({"msg":err.message}) 
    }
})
notesRouter.get("/:id",async(req,res)=>{
    const noetid = req.params.id
    const token=req.headers.authorization.split(" ")[1]
    const decoded=jwt.verify(token,process.env.JWT_Token)
    try{
        if(decoded){
            const notes=await NoteModel.findOne({_id : noetid})
            res.status(200).send(notes)
        }
    } catch(err){
        res.status(400).send({"msg":err.message}) 
    }
})


notesRouter.post("/add", async (req,res)=>{
    try {
        // console.log(req.body)
        const new_note=new NoteModel(req.body)
        await new_note.save()
        res.status(200).send({"msg":"Note Created"})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

notesRouter.patch("/update/:noteID", async(req,res)=>{
try {
    const noteid = req.params.noteID;
    console.log(noteid)
    const note  = await NoteModel.findByIdAndUpdate({_id : noteid} , req.body)
    res.status(200).send({msg : "Note Updated Successfully"})
} catch (error) {
    res.status(400).send({msg: error.message})
}
})


notesRouter.delete("/delete/:noteID", async(req,res)=>{
    try{
    const noteid = req.params.noteID;
    const note  = await NoteModel.findByIdAndDelete({_id : noteid})
    res.status(200).send({msg : "Note Deleted Successfully"})
} catch (error) {
    res.status(400).send({msg: err.message})
}
})



module.exports={notesRouter}
