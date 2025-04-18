
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const doctorAppointmentSchema = new Schema({
  id: String,
  patientName: String,
  doctorName: String, 
  appointmentDate: Date,
  appointmentTime: String,
  reason: String,
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled', 'rescheduled'],
    default: 'scheduled'
  },
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
