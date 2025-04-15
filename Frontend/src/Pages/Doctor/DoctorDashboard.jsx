import { useState } from "react";
import Header from "../../components/header/Header";
import { Check } from 'lucide-react';

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("today");
  const [isMedicalRecordModalOpen, setIsMedicalRecordModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [medicalRecord, setMedicalRecord] = useState("");
  const [appointments, setAppointments] = useState([
    {
      id: "apt-001",
      patientName: "Sarah Johnson",
      patientId: "P-20250326",
      patientImage: "/placeholder.svg",
      date: "March 26, 2025",
      time: "9:00 AM",
      reason: "Annual checkup",
      status: "scheduled",
      medicalRecord: "",
    },
    {
      id: "apt-002",
      patientName: "Robert Williams",
      patientId: "P-20250327",
      patientImage: "/placeholder.svg",
      date: "March 26, 2025",
      time: "10:30 AM",
      reason: "Follow-up consultation",
      status: "scheduled",
      medicalRecord: "",
    },
    {
      id: "apt-003",
      patientName: "Emma Davis",
      patientId: "P-20250328",
      patientImage: "/placeholder.svg",
      date: "March 26, 2025",
      time: "1:00 PM",
      reason: "Skin condition assessment",
      status: "scheduled",
      medicalRecord: "",
    },
    {
      id: "apt-004",
      patientName: "Michael Brown",
      patientId: "P-20250329",
      patientImage: "/placeholder.svg",
      date: "March 25, 2025",
      time: "11:15 AM",
      reason: "Chest pain evaluation",
      status: "completed",
      medicalRecord: "Patient reports reduced chest pain. ECG normal.",
    },
    {
      id: "apt-005",
      patientName: "Jennifer Wilson",
      patientId: "P-20250330",
      patientImage: "/placeholder.svg",
      date: "March 25, 2025",
      time: "2:45 PM",
      reason: "Medication review",
      status: "no-show",
      medicalRecord: "",
    },
  ]);

  const completeAppointment = (id) => {
    setSelectedAppointmentId(id);
    setMedicalRecord("");
    setIsMedicalRecordModalOpen(true);
  };

  const handleMedicalRecordSubmit = (e) => {
    e.preventDefault();
    // Simulate backend API call
    setAppointments(
      appointments.map((apt) =>
        apt.id === selectedAppointmentId
          ? { ...apt, status: "completed", medicalRecord }
          : apt
      )
    );
    setIsMedicalRecordModalOpen(false);
    setSelectedAppointmentId(null);
    setMedicalRecord("");
  };

  const markNoShow = (id) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: "no-show" } : apt
      )
    );
  };

  const todaysAppointments = appointments.filter(
    (apt) => apt.date === "March 26, 2025" && apt.status === "scheduled"
  );
  const pastAppointments = appointments.filter(
    (apt) => apt.status === "completed" || apt.status === "no-show"
  );

  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Dashboard header section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
            <p className="text-gray-600">Manage your appointments and patient records</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative h-10 w-10 rounded-full overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="Dr. James Roberts"
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p className="font-medium">Dr. James Roberts</p>
              <p className="text-sm text-gray-600">Cardiologist</p>
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Today's Appointments</p>
                <p className="text-2xl font-bold">{todaysAppointments.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                {/* Calendar icon */}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="text-2xl font-bold">
                  {appointments.filter((apt) => apt.status === "completed").length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                {/* Check icon */}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">No-Shows</p>
                <p className="text-2xl font-bold">
                  {appointments.filter((apt) => apt.status === "no-show").length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                {/* X icon */}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Total Patients</p>
                <p className="text-2xl font-bold">124</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                {/* Users icon */}
              </div>
            </div>
          </div>
        </div>

        {/* Appointments section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="grid grid-cols-3">
              <button
                className={`py-4 text-center text-sm font-medium ${
                  activeTab === "today"
                    ? "text-cyan-600 border-b-2 border-cyan-500"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("today")}
              >
                Today's Schedule
              </button>
              <button
                className={`py-4 text-center text-sm font-medium ${
                  activeTab === "upcoming"
                    ? "text-cyan-600 border-b-2 border-cyan-500"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("upcoming")}
              >
                Upcoming
              </button>
              <button
                className={`py-4 text-center text-sm font-medium ${
                  activeTab === "past"
                    ? "text-cyan-600 border-b-2 border-cyan-500"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("past")}
              >
                Past Appointments
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === "today" && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Today's Appointments</h2>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
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
                        className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                      <input
                        type="search"
                        placeholder="Search patients..."
                        className="pl-8 w-[250px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      />
                    </div>
                    <div className="relative">
                      <select className="w-[180px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 appearance-none bg-white">
                        <option value="all">All Appointments</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="completed">Completed</option>
                        <option value="no-show">No-Show</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {todaysAppointments.length > 0 ? (
                    todaysAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
                      >
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div className="flex items-start space-x-4">
                              <div className="relative h-12 w-12 rounded-full overflow-hidden">
                                <img
                                  src={appointment.patientImage || "/placeholder.svg"}
                                  alt={appointment.patientName}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h4 className="font-semibold">{appointment.patientName}</h4>
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {appointment.patientId}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600">{appointment.reason}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                  <div className="flex items-center">{appointment.time}</div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 md:mt-0 flex items-center space-x-2">
                              <button className="flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                                View Records
                              </button>
                              <button
                                className="flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                onClick={() => completeAppointment(appointment.id)}
                              >
                                <Check />
                                Complete
                              </button>
                              <button
                                className="flex items-center px-3 py-1.5 border border-red-200 text-sm font-medium rounded text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                onClick={() => markNoShow(appointment.id)}
                              >
                                No-Show
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                      <div className="p-6 text-center">
                        <p className="text-gray-500">No appointments scheduled for today.</p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === "upcoming" && (
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">Upcoming Appointments</h3>
                  <p className="mt-1 text-sm text-gray-500">View and manage your upcoming appointments</p>
                </div>
                <div className="text-center py-8">
                  <p className="text-gray-500">No upcoming appointments scheduled.</p>
                </div>
              </div>
            )}

            {activeTab === "past" && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Past Appointments</h2>
                  <div className="flex items-center space-x-2">{/* Search input */}</div>
                </div>

                <div className="space-y-4">
                  {pastAppointments.length > 0 ? (
                    pastAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
                      >
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div className="flex items-start space-x-4">
                              <div className="relative h-12 w-12 rounded-full overflow-hidden">
                                <img
                                  src={appointment.patientImage || "/placeholder.svg"}
                                  alt={appointment.patientName}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h4 className="font-semibold">{appointment.patientName}</h4>
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                    ${
                                      appointment.status === "completed"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {appointment.status === "completed" ? "Completed" : "No-Show"}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600">{appointment.reason}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                  <div className="flex items-center">{appointment.date}</div>
                                  <div className="flex items-center">{appointment.time}</div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 md:mt-0 flex items-center space-x-2">
                              <button className="flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                                View Records
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                      <div className="p-6 text-center">
                        <p className="text-gray-500">No past appointments found.</p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Medical Record Modal */}
      {isMedicalRecordModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setIsMedicalRecordModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Enter Medical Record</h2>
              <button
                onClick={() => setIsMedicalRecordModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleMedicalRecordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Medical Record Notes
                </label>
                <textarea
                  value={medicalRecord}
                  onChange={(e) => setMedicalRecord(e.target.value)}
                  rows="5"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                  placeholder="Enter medical notes for this appointment..."
                  required
                />
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsMedicalRecordModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}