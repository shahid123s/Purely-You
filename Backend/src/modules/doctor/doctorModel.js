import mongoose from "mongoose";

const doctorSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    licenseNumber: {
        type: String,
        required: true,
    },
    experince: {
        type: Number,
        default: 0,
        required: true,
    },
    profileImage: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['approved', 'pending', 'rejected'],
        default: 'pending',
    },
})


const Doctor = mongoose.model('Doctor', doctorSchema);  
export default Doctor