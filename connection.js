// import mongoose
const mongoose=require('mongoose')

const connectionString=process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    console.log('mongodb connected successfully');  
}).catch((err)=>{
    console.log(`couldnot connect because:${err}`);
    
})