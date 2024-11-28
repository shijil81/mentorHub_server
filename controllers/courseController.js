const coursePurchases=require('../model/purchasedCoursesModel')
const users=require('../model/registerModel')

exports.addCourseController=async(req,res)=>{
    const userId=req.payload
    const mentorId=req.body.mentorId

    try {
       
       
        // check if the course already purchased
        const existingPurchase = await coursePurchases.findOne({userId,mentorId})
        console.log(existingPurchase);
        

        if(existingPurchase){
            res.status(400).json({message:'Course already purchased'})
        }else{
            const newPurchase=new coursePurchases({
                userId,
                mentorId
            })
            await newPurchase.save()
            res.status(200).json(newPurchase)
        }

    } catch (error) {
        res.status(401).json(error)
        
    }
}

exports.getAddedCourseController=async(req,res)=>{
    const userId=req.params.id 
    
    try {
        // fetch purchased courses and populate mentor details
    const purchasedCourses=await coursePurchases.find({userId}).populate('mentorId','username profile description')// Populate specific fields from the users model

    res.status(200).json(purchasedCourses)
        
    } catch (error) {
        console.log(error);
        res.status(401).json(error)
    }

}

exports.deleteCourseController=async(req,res)=>{
    const id=req.params.id
    console.log(id);
    
    
    try {
        
        const course= await coursePurchases.findByIdAndDelete({_id:id})
        res.status(200).json('deleted successfully')

    } catch (error) {
        res.status(401).json(error)
    }
}

exports.stdCountController=async(req,res)=>{
const mentorId=req.params.id


try {
    const stdCount=await coursePurchases.countDocuments({mentorId})

    res.status(200).json({count:stdCount})
} catch (error) {
    res.status(401).json(error)
}
}

exports.courseCountController=async(req,res)=>{
    const userId=req.params.id

    try {
        const courseCount=await coursePurchases.countDocuments({userId})

        res.status(200).json({count:courseCount})
    } catch (error) {
        res.status(401).json(error)
    }
}