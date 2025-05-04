
// Chat model schema using ESM syntax
import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Patient',
    required: true
  },
  content: [{
    msg: {
      type: String,
      required: true
    },
    sender: {
      type: String,
      required: true,
      enum: ['doctor', 'patient']
    }
}], 
 lastMessage: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
chatSchema.index({ doctor: 1, patient: 1 });
chatSchema.index({ lastMessage: -1 });

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;


