const jwt=require('jsonwebtoken')


const jwtMiddleware=(req,res,next)=>{
    console.log('inside jwt');
    
    const token=req.headers["authorization"].split(' ')[1]

    
    try {
        const jwtResponse=jwt.verify(token,"bosskey")
        console.log(jwtResponse);
        req.payload=jwtResponse.userId
        
        
        next()
    } catch (error) {
        res.status(401).json(`Authorization faild ${error}`)
    }
}

module.exports=jwtMiddleware