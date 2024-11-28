const uploads=require('../model/uploadsModel')



exports.uploadVideosController=async(req,res)=>{
    const userId=req.payload
    
    
    const{status,title,description,video}=req.body
    const thumbnail=req.files['thumbnail'] ? req.files['thumbnail'][0].filename : null;

    const videoFile = req.files['video'] ? req.files['video'][0].filename : video;
    

    try {
        if(!thumbnail || !videoFile){
            res.status(400).json({error:'Both thumbnail and video are required'})
        }
        else{
            const newUploads=new uploads({
                userId,
                status,
                title,
                description,
                thumbnail,
                video:videoFile

            })
            await newUploads.save()
            res.status(200).json(newUploads)
        }
        
    } catch (error) {
        res.status(401).json(error)
    }

}

exports.getUploadsController=async(req,res)=>{
    
    const userId=req.payload

    try {
        const videos=await uploads.find({userId})
        res.status(200).json(videos)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.deleteUploadsController=async(req,res)=>{

        
    const id=req.params.id
    try {
        const videos= await uploads.findByIdAndDelete({_id:id})
        res.status(200).json('deleted successfully')
    } catch (error) {
        
        res.status(401).json(error)
    }

}

exports.getMentorUploadsController=async(req,res)=>{
    const userId=req.params.id
    
    

    try {
        const videos=await uploads.find({userId})
        res.status(200).json(videos)
    } catch (error) {
        res.status(401).json(error)
    }
}