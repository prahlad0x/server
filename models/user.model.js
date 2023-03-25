const mongoose = require('mongoose')


const useSchema =new mongoose.Schema({
    userName : {type : String, required : true},
    email : {type : String, required : true, unique: true},
    password : {type : String, required :true},
    mobile : {type : Number, required : true}
})



const UserModel =  mongoose.model('user', useSchema)


module.exports = { UserModel }

