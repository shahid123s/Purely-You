
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const doctorAppointmentSchema = new Schema({
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  doctorName: {
    type: String,
    required: true
  },
  patientId: {
    type: Schema.Types.ObjectId, 
    ref: 'Patient',
    required: true
  },
  patientName: {
    type: String,
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  appointmentTime: {
    type: String,
    required: true
  },
  reason: String,
  roomId: String,
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled', 'pending'],
    default: 'pending'
  },
  uiState: {
    buttonState: {
      type: String,
      enum: ["giveLink", "attended", "submitRecord"],
      default: "giveLink",
    },

  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


const DoctorAppointment = model('DoctorAppointment', doctorAppointmentSchema);

export default DoctorAppointment;
  