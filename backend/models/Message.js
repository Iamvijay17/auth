
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  senderId: {
    type: String,
    ref: 'User', 
    required: true
  },
  receiverId: {
    type: String,
    ref: 'User', 
    required: true
  },
  message: {
    type: String,
    required: false 
  },
  messageId: {
    type: String,
    required: false 
  },
  file: {
    type: String, 
    required: false 
  },
  fileType: {
    type: String, 
    required: false
  },
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read'],
    default: 'sent'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
