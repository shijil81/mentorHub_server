// import mongoose
const mongoose=require('mongoose')

const regSchema=mongoose.Schema({
    userId:{
        required:true,
        type:String
    },
    status:{
        required:true,
        type:String
    },
    thumbnail:{
        required:true,
        type:String
    },
    video:{
        required:true,
        type:String
    },
    title:{
        required:true,
        type:String
    },
    description:{
        required:true,
        type:String
    }

})

const uploads=mongoose.model("uploads",regSchema)

module.exports=uploads