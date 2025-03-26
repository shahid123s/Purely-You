import { useState } from "react"
import AppointmentModal from "../../Components/Appoiment/AppoimentModal"
import Header from "../../Components/Header"

const PatientPortal = () => {
    const [showModal, setShowModal] = useState(false)
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex flex-col items-center justify-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
                <h2 className="text-2xl font-bold">Sarah Johnson</h2>
                <p className="text-gray-600">Patient ID: P-20250326</p>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="text-gray-600">Email</h3>
                  <p>sarah.johnson@example.com</p>
                </div>

                <div>
                  <h3 className="text-gray-600">Phone</h3>
                  <p>(555) 123-4567</p>
                </div>

                <div>
                  <h3 className="text-gray-600">Date of Birth</h3>
                  <p>June 12, 1985</p>
                </div>

                <div>
                  <h3 className="text-gray-600">Address</h3>
                  <p>
                    123 Main Street, Apt 4B
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </div>

              <button className="w-full mt-6 py-2 border rounded-md flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit Profile
              </button>
            </div>

            <div className="md:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Upcoming & Past Appointments</h2>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Book New Appointment</button>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-bold">Dr. James Roberts</h3>
                        <p className="text-gray-600">Cardiology</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-gray-600">April 15, 2025</span>
                          <span className="text-gray-600">10:30 AM</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Upcoming</span>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <button className="px-4 py-1 border rounded-md">Reschedule</button>
                      <button className="px-4 py-1 bg-red-500 text-white rounded-md">Cancel</button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-bold">Dr. Emily Clark</h3>
                        <p className="text-gray-600">Pediatrics</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-gray-600">March 22, 2025</span>
                          <span className="text-gray-600">2:00 PM</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Completed</span>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <button className="px-4 py-1 border rounded-md">View Details</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AppointmentModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={(appointment) => {
            console.log('Booked:', appointment)
            setShowModal(false)
          }}
        />
      </main>

    </div>
  )
}

export default PatientPortal

