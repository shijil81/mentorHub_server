const mongoose=require('mongoose')

const coursePurchaseSchema=new mongoose.Schema({
    userId:{
        required:true,
        type:String
    },
    mentorId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        ref: 'users',  // Reference the User model
    },
    purchaseDate:{
        type:Date,
        default:Date.now
    }
})

const coursePurchases=mongoose.model('coursePurchases',coursePurchaseSchema)

module.exports=coursePurchases