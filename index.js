// import dotenv
require('dotenv').config()

// import express
const express = require('express')

// import cors
const cors=require('cors')

//import http and socket.io
const http=require('http')
const {Server}=require('socket.io')


// import router
const router=require('./routes')

// import connection file
require('./connection')

// import saveMessage controller
const {saveMessageController}=require('./controllers/chatController')

// create server using express
const mentorServer = express()

// server connecting with frontend
mentorServer.use(cors())


// parse the data from frontend
mentorServer.use(express.json())

// router
mentorServer.use(router)

// use static method to export a folder/file from the serverside
mentorServer.use('/uploads',express.static('./uploads'))

// create http server for socket.io
const httpServer =http.createServer(mentorServer)

// set up socket.io server
const io= new Server(httpServer,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
})

// listen for socket.io connections
io.on('connection',(socket)=>{
    console.log('User connected:',socket.id);

    // Event to join a specific chat room(1-to-1 chat)
    socket.on('joinRoom', ({ roomId }) => {
        socket.join(roomId);
        console.log(`User with ID: ${socket.id} joined room: ${roomId}`);
    });

      // Listen for 'send_message' event
  socket.on("send_message", async (data) => {
  console.log(data);
  
    
    try {
      
      // Call the saveMessageController or your own save logic directly here
     await saveMessageController({
        chatRoom: data.room,
        sender: data.sender,
        receiver: data.receiver,
        message: data.message,
      });

      // Emit the message back to the room after saving
      io.to(data.room).emit("messageReceived", data);
      console.log('emit message',data);
      
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

    socket.on('disconnect',()=>{
        console.log('User disconnect:',socket.id);
        
    })
    
})


// set port for the server
const PORT = 4000 || process.env.PORT

// listen to the request received at the particular port

httpServer.listen(PORT,()=>{
    console.log(`server running successfully at port number ${PORT}`);
    
})