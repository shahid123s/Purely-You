import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, default: "user", enum: ["user", "admin", 'doctor']},
    phone: {type: String, default: "", required: true},
    address: {type: String, default: "", required: true},
    gender: {type: String, default: 'other', required: true, enum: ["male", "female", "other",] },
    dob: {type: String, default: "", required: true},
    bloodGroup: {type: String, default: "", required: true},
    status: {type: String, default: "active", enum: ["active", "inactive"]},
    certificate: {type: String, default: ""},
    profileImage: {type: String, default: ""},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

const Patient = mongoose.model('Patient', patientSchema);

export default Patient