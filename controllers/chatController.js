const messsages=require('../model/messageModel')
const user=require('../model/registerModel')
const mongoose = require('mongoose');


// Save new message
exports.saveMessageController=async(data)=>{
    const{chatRoom,sender,receiver,message}=data

    try {
        const newMessage=new messsages({
            chatRoom,
            sender,
            receiver,
            message
        })
        await newMessage.save()
    } catch (error) {
        console.log('Error saving message:',error);
        
    }
}

// Get chat history for a particular room
exports.getChatHistoryController=async(req,res)=>{
    const room=req.params.room

    try {
        const message = await messsages.find({chatRoom:room}).sort({timestamp:1})
        res.status(200).json(message)
    } catch (error) {
        res.status(400).json({message:'Could not fetch chat history'})
    }
}

// Get all users (for selecting who to chat with)

exports.getAllUsersController=async(req,res)=>{
    const userId=req.payload
    
    try {
        const users=await user.find({_id:{$ne:userId}}).select('_id username email profile')
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({message:'Could not fetch users',error:error.message})
    }
}


// Get list of previously interacted users
exports.getIntractedUsersController = async (req, res) => {
  const userId = req.payload;
  

  try {
    // Step 1: Find unique interacted user IDs along with the latest message
    const interactedUsers = await messsages.aggregate([
      {
        $match: {
          $or: [
            { sender: new mongoose.Types.ObjectId(userId) },
            { receiver: new mongoose.Types.ObjectId(userId) },
          ]
        }
      },
      {
        $project: {
          otherUserId: {
            $cond: {
              if: { $eq: ["$sender", new mongoose.Types.ObjectId(userId)] },
              then: "$receiver",
              else: "$sender"
            }
          },
          message: 1,
          timestamp: 1
        }
      },
      {
        $sort: { timestamp: -1 } // Sort by timestamp in descending order
      },
      {
        $group: {
          _id: "$otherUserId",
          lastMessage: { $first: "$message" }, // Get the last message
          lastMessageTime: { $first: "$timestamp" } // Optionally get the timestamp of the last message
        }
      }
    ]);

    // Step 2: Fetch user details for each unique user ID
    const userIds = interactedUsers.map(user => user._id);
    const users = await user.find({ _id: { $in: userIds } }, 'username profile');

    // Step 3: Map each user to their last message
    const usersWithLastMessage = users.map(user => {
      const interaction = interactedUsers.find(interaction => interaction._id.equals(user._id));
      return {
        _id: user._id,
        username: user.username,
        profile: user.profile,
        lastMessage: interaction ? interaction.lastMessage : null,
        lastMessageTime: interaction ? interaction.lastMessageTime : null
      };
    });
    
    
    res.status(200).json(usersWithLastMessage);
  } catch (error) {
    console.error("Error fetching interacted users:", error);
    res.status(500).json({ message: "Error fetching interacted users" });
  }
};
  