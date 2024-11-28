const subscriptions=require('../model/subscriptionModel')

exports.addSubscriptionsController=async(req,res)=>{
    const {email}=req.body

    // Simple email validation
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  try {
    const existingUser=await subscriptions.findOne({email})
    if(existingUser){
        res.status(406).json('Account already exist')
    }else{
        const newSubscription=new subscriptions({
            email
        })
        await newSubscription.save()
        res.status(200).json(newSubscription)
    }
  } catch (error) {
    res.status(401).json(error)
  }

}


exports.getSubscriptionController=async(req,res)=>{
    try {
        const subscriptionList=await subscriptions.find()
        res.status(200).json(subscriptionList)
    } catch (error) {
        res.status(401).json(error)
    }

}

exports.getSubCountController=async(req,res)=>{
    try {
        const subCount=await subscriptions.countDocuments();
        res.status(200).json({count:subCount})
    } catch (error) {
        res.status(401).json(error)
    }

}