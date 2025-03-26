import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const AppointmentModal = ({ isOpen, onClose, onSubmit }) => {
  const [date, setDate] = useState(new Date())
  const [reason, setReason] = useState('')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-medical-dark">Book Appointment</h2>
        
        <div className="mb-4">
          <label className="block text-medical-dark mb-2">Date</label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            className="border p-2 rounded w-full"
            minDate={new Date()}
          />
        </div>

        <div className="mb-4">
          <label className="block text-medical-dark mb-2">Reason</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="border p-2 rounded w-full"
            rows="3"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-medical-alert border border-medical-alert rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit({ date, reason })}
            className="px-4 py-2 bg-medical-accent text-white rounded"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  )
}

export default AppointmentModal