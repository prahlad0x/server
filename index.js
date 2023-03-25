const express=require("express")
const {connection}=require("./db")
const {userRoute}=require("./routes/user.routes")
const {notesRouter}=require("./routes/notes.route")
const {authenticate}=require("./middlwares/auth.middleware")
require('dotenv').config()

const cors=require("cors")
const app=express()
app.use(express.json())
app.use(cors())

app.use("/users",userRoute)

app.use(authenticate)

app.use("/notes",notesRouter)

app.listen(process.env.port,async()=>{
    // console.log(process.env.port)
    try{
        await connection
        console.log("Connected to the DB")
    }catch(err){
        console.log("Cannot connect to DB")
        console.log(err)
    }
    console.log("Server is running")
})