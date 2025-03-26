import { useState } from "react";
import Header from "../../Components/Header";

export default function PatientProfile() {
  const [activeTab, setActiveTab] = useState("appointments");
  const [appointments, setAppointments] = useState([
    {
      id: "apt-1",
      doctor: "Dr. James Roberts",
      specialty: "Cardiology",
      date: "April 15, 2025",
      time: "10:30 AM",
      status: "upcoming",
    },
    {
      id: "apt-2",
      doctor: "Dr. Emily Clark",
      specialty: "Pediatrics",
      date: "March 22, 2025",
      time: "2:00 PM",
      status: "completed",
    },
    {
      id: "apt-3",
      doctor: "Dr. David Lee",
      specialty: "Dermatology",
      date: "May 5, 2025",
      time: "11:15 AM",
      status: "upcoming",
    },
  ]);

  const cancelAppointment = (id) => {
    setAppointments(appointments.map((apt) => 
      apt.id === id ? { ...apt, status: "cancelled" } : apt
    ));
  };

  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 pb-2">
                <div className="flex justify-center">
                  <div className="relative h-24 w-24 rounded-full overflow-hidden">
                    <img
                      src="/placeholder.svg"
                      alt="User"
                      className="object-cover w-full h-full"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-center mt-4">Sarah Johnson</h2>
                <p className="text-sm text-gray-500 text-center">Patient ID: P-20250326</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <div className="text-sm text-gray-600">sarah.johnson@example.com</div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <div className="text-sm text-gray-600">(555) 123-4567</div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                    <div className="text-sm text-gray-600">June 12, 1985</div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Address</label>
                    <div className="text-sm text-gray-600">
                      123 Main Street, Apt 4B
                      <br />
                      New York, NY 10001
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-6 pb-6">
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Appointments/Records Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="grid grid-cols-2">
                  <button
                    className={`py-4 text-center text-sm font-medium ${
                      activeTab === "appointments"
                        ? "text-cyan-600 border-b-2 border-cyan-500"
                        : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab("appointments")}
                  >
                    My Appointments
                  </button>
                  <button
                    className={`py-4 text-center text-sm font-medium ${
                      activeTab === "medical-records"
                        ? "text-cyan-600 border-b-2 border-cyan-500"
                        : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab("medical-records")}
                  >
                    Medical Records
                  </button>
                </div>
              </div>

              <div className="p-6">
                {activeTab === "appointments" ? (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Upcoming & Past Appointments</h3>
                      <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                        Book New Appointment
                      </button>
                    </div>

                    <div className="space-y-4">
                      {appointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className={`bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden ${
                            appointment.status === "cancelled" ? "opacity-60" : ""
                          }`}
                        >
                          <div className="p-6">
                            <div className="flex flex-col md:flex-row justify-between">
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <h4 className="font-semibold">{appointment.doctor}</h4>
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                      appointment.status === "upcoming"
                                        ? "bg-green-100 text-green-800"
                                        : appointment.status === "completed"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600">{appointment.specialty}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                  <div className="flex items-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="mr-1 h-4 w-4"
                                    >
                                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                                      <line x1="16" x2="16" y1="2" y2="6" />
                                      <line x1="8" x2="8" y1="2" y2="6" />
                                      <line x1="3" x2="21" y1="10" y2="10" />
                                    </svg>
                                    {appointment.date}
                                  </div>
                                  <div className="flex items-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="mr-1 h-4 w-4"
                                    >
                                      <circle cx="12" cy="12" r="10" />
                                      <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                    {appointment.time}
                                  </div>
                                </div>
                              </div>

                              <div className="mt-4 md:mt-0 flex items-center space-x-2">
                                {appointment.status === "upcoming" && (
                                  <>
                                    <button className="px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                                      Reschedule
                                    </button>
                                    <button
                                      className="px-3 py-1.5 border border-transparent text-sm font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                      onClick={() => cancelAppointment(appointment.id)}
                                    >
                                      Cancel
                                    </button>
                                  </>
                                )}
                                {appointment.status === "completed" && (
                                  <button className="px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                                    View Details
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-gray-900">Medical Records</h3>
                      <p className="mt-1 text-sm text-gray-500">View and download your medical records</p>
                    </div>
                    <div className="text-center py-8">
                      <p className="text-gray-500">No medical records available yet.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}