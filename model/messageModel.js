const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  chatRoom: {
    type: String,
    required: true,
  }, // Unique room ID (combination of user IDs)

  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  // Sender reference
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  // Receiver reference
  message: {
    type: String,
    required: true,
  }, // Message text
  timestamp: {
    type: Date,
    default: Date.now,
  }, // Message timestamp
});

const messages = mongoose.model("messages", messageSchema);

module.exports = messages;
