const mongoose=require('mongoose')


const subscriptionSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    subscribedAt:{
        type:Date,
        default:Date.now
    }
})

const subscriptions=mongoose.model('subscriptions',subscriptionSchema)

module.exports=subscriptions