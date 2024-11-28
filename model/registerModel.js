// import mongoose
const mongoose=require('mongoose')

const regSchema=mongoose.Schema({
    username:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
    website:{
        type:String
    },
    profession:{
        type:String
    },
    description:{
        type:String
    },
    verifyimg:{
        type:String
    },
    profile:{
        type:String
    },
    status:{
        type:String
    },
    role:{
        required:true,
        type:String
    }    

})

const users=mongoose.model("users",regSchema)

module.exports=users