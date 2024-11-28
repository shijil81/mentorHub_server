const users=require('../model/registerModel')
const jwt=require('jsonwebtoken')

// Mentor Register
exports.mentorRegisterController=async(req,res)=>{
    
    
    const{username,email,password,website,profession,description}=req.body

    const verifyimg=req.file.filename
    
    try {
        const existingUser=await users.findOne({email})
        if(existingUser){
            res.status(406).json('Account already exist')
        }else{
            const newUser=new users({
                username,
                email,
                password,
                website,
                profession,
                description,
                verifyimg,
                profile:"",
                status:"pending",
                role:"mentor"
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
        
    } catch (error) {
        res.status(401).json(error)
    }
}

// user Register

exports.userRegisterController=async(req,res)=>{
    const{username,email,password,profession,description}=req.body
    
    try {
        const existingUser=await users.findOne({email})
        if(existingUser){
            res.status(406).json('Account already exist')
        }else{
            const newUser=new users({
                username,
                email,
                password,
                website:"",
                profession,
                description,
                verifyimg:"",
                profile:"",
                status:"",
                role:"user"
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
        
    } catch (error) {
        res.status(401).json(error)
    }
}

// get all mentors
exports.getMentorProfileController=async(req,res)=>{
    
    
    try{const mentors=await users.find({ role: 'mentor' })

    if(!mentors){
        return res.status(401).json({message:'no mentors found'})
    }
    res.status(200).json(mentors)
}catch{
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message }); 
}
}



// login
exports.loginController=async(req,res)=>{
    const{email,password}=req.body

    try {
        const existingUser=await users.findOne({email,password})
        if(existingUser){
            const token=jwt.sign({userId:existingUser._id},"bosskey")
            res.status(200).json({existingUser,token})
        }
        else{
            res.status(406).json('Account doesnot exist')
        }
        
    } catch (error) {
        res.status(401).json(error)
    }
}

// update user profile
exports.updateProfileController=async(req,res)=>{
    
    
    const userId=req.payload
    const{username,email,password,profession,description,profile}=req.body
    const profileImg=req.file?req.file.filename:profile
    

    try {
        const existingUser=await users.findByIdAndUpdate({_id:userId},{
            username,
            email,
            password,
            website:"",
            profession,
            description,
            verifyimg:"",
            profile:profileImg,
            status:"",
            role:"user"
            },{new:true})
        await existingUser.save()
        res.status(200).json(existingUser)

    } catch (error) {
        res.status(401).json(error)
    }
}

// update mentor profile
exports.updateMprofileController=async(req,res)=>{
       
       
    const userId=req.payload
    
    const{username,email,password,website,profession,description,profile}=req.body
    const profileImg=req.file?req.file.filename:profile
    const findUser = await users.findById(userId);
    

      if (!findUser) {
            return res.status(404).json({ message: 'User not found' });
        }

    try {
        
 
        const existingUser=await users.findByIdAndUpdate({_id:userId},
            {   
            username,
            email,
            password,
            website,
            profession,
            description,
            verifyimg:findUser.verifyimg,
            profile:profileImg,
            status:findUser.status,
            role:findUser.role
            },{new:true})
            
        await existingUser.save()
        res.status(200).json(existingUser)

    } catch (error) {
        res.status(401).json(error)
    }
}

// update Admin Profile

exports.updateAprofileController=async(req,res)=>{
    
    const userId=req.payload
    const{username,email,password,profile}=req.body
    const profileImg=req.file?req.file.filename:profile
    const findUser = await users.findById(userId);

      if (!findUser) {
            return res.status(404).json({ message: 'User not found' });
        }

    

    try {
        const existingUser=await users.findByIdAndUpdate({_id:userId},{
            username,
            email,
            password,
            website:"",
            profession:"",
            description:"",
            verifyimg:findUser.verifyimg,
            profile:profileImg,
            status:findUser.status,
            role:findUser.role
            },{new:true})
        await existingUser.save()
        res.status(200).json(existingUser)

    } catch (error) {
        res.status(401).json(error)
    }
}
// mentor profile verify
exports.verifyprofileController=async(req,res)=>{
    const{userId,username,email,website,verifyimg,profession,description,profile}=req.body


    const findUser = await users.findById(userId);

      if (!findUser) {
            return res.status(404).json({ message: 'User not found' });
        }

    

    try {
        console.log('inside try');
        
        const existingUser=await users.findByIdAndUpdate({_id:userId},{
            username,
            email,
            password:findUser.password,
            website,
            profession,
            description,
            verifyimg,
            profile,
            status:"verified",
            role:findUser.role
            },{new:true})
        await existingUser.save()
        res.status(200).json(existingUser)

    } catch (error) {
        res.status(401).json(error)
    }
       
}

// to fetch all verified mentors to display user home
exports.getVerifiedMentorController=async(req,res)=>{

    try {
        // Fetch all users with role 'mentor' and status 'verified'
        const verifiedMentors=await users.find({role:'mentor',status:'verified'})
         
        if(verifiedMentors){
            res.status(200).json(verifiedMentors)
        }else{
            res.status(404).json({ message: 'No mentors found' });
        }
    
    } catch (error) {
        res.status(401).json(error)
    }

}

exports.getMentorbyIdController=async(req,res)=>{
    const userId=req.params.id
    try {
        const mentor=await users.findById({_id:userId})
        
        if(!mentor){
            res.status(404).json({ message: 'Mentor not found' })
        }
        else{
            res.status(200).json(mentor)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}


exports.getUserCountController=async(req,res)=>{
    try {
        const userCount=await users.countDocuments({ role: 'user' });
        res.status(200).json({count:userCount})
    } catch (error) {
        res.status(401).json(error)
    }
}
