
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({

    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
