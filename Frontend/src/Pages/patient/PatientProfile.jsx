import { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import { fetchPatientProfile } from "../../services/FetchDatas";



export default function PatientProfile() {
  const [activeTab, setActiveTab] = useState("appointments");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [patient, setPatient] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "(555) 123-4567",
    dob: "June 12, 1985",
    address: "123 Main Street, Apt 4B\nNew York, NY 10001",
    patientId: "P-20250326",
    profileImage: null,
  });
  const [formData, setFormData] = useState({ ...patient });
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Doctors data by specialty
  const [doctors, setDoctors] = useState([
    {
      id: "doc-1",
      name: "Dr. James Roberts",
      specialty: "Cardiology",
      availableDays: ["Monday", "Wednesday", "Friday"],
      image: "/doctor1.jpg"
    },
    {
      id: "doc-2",
      name: "Dr. Emily Clark",
      specialty: "Pediatrics",
      availableDays: ["Tuesday", "Thursday", "Saturday"],
      image: "/doctor2.jpg"
    },
    {
      id: "doc-3",
      name: "Dr. David Lee",
      specialty: "Dermatology",
      availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      image: "/doctor3.jpg"
    },
    {
      id: "doc-4",
      name: "Dr. Maria Garcia",
      specialty: "Neurology",
      availableDays: ["Wednesday", "Thursday", "Friday"],
      image: "/doctor4.jpg"
    },
    {
      id: "doc-5",
      name: "Dr. Robert Chen",
      specialty: "Orthopedics",
      availableDays: ["Monday", "Tuesday", "Friday"],
      image: "/doctor5.jpg"
    }
  ]);

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

  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    specialty: "",
    doctor: "",
    date: "",
    time: "",
    problem: "",
    notes: ""
  });

  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    fetchPatientProfile();
  },[]) 

  // Filter doctors based on selected specialty
  useEffect(() => {
    if (bookingForm.specialty) {
      const filteredDoctors = doctors.filter(doc => doc.specialty === bookingForm.specialty);
      setAvailableDoctors(filteredDoctors);
      setBookingForm(prev => ({ ...prev, doctor: "", date: "", time: "" }));
    } else {
      setAvailableDoctors([]);
    }
  }, [bookingForm.specialty, doctors]);

  // Generate available dates based on selected doctor's availability
  useEffect(() => {
    if (bookingForm.doctor) {
      const selectedDoctor = doctors.find(doc => doc.id === bookingForm.doctor);
      if (selectedDoctor) {
        // Generate next 14 days availability
        const dates = [];
        const today = new Date();
        for (let i = 1; i <= 14; i++) {
          const date = new Date();
          date.setDate(today.getDate() + i);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
          if (selectedDoctor.availableDays.includes(dayName)) {
            dates.push({
              value: date.toISOString().split('T')[0],
              display: date.toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })
            });
          }
        }
        setAvailableDates(dates);
        setBookingForm(prev => ({ ...prev, date: "", time: "" }));
      }
    } else {
      setAvailableDates([]);
    }
  }, [bookingForm.doctor, doctors]);

  // Generate available times based on selected date
  useEffect(() => {
    if (bookingForm.date) {
      // Generate standard time slots (every 30 minutes from 9AM to 5PM)
      const times = [];
      for (let hour = 9; hour <= 16; hour++) {
        times.push({
          value: `${hour}:00`,
          display: `${hour}:00 AM`
        });
        times.push({
          value: `${hour}:30`,
          display: `${hour}:30 AM`
        });
      }
      // Convert 12PM to 12:00 PM and times after to PM
      const formattedTimes = times.map(time => {
        let [hours, minutes] = time.value.split(':');
        hours = parseInt(hours);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        return {
          value: time.value,
          display: `${displayHours}:${minutes} ${ampm}`
        };
      });
      setAvailableTimes(formattedTimes);
      setBookingForm(prev => ({ ...prev, time: "" }));
    } else {
      setAvailableTimes([]);
    }
  }, [bookingForm.date]);

  const cancelAppointment = (id) => {
    setAppointments(appointments.map((apt) => 
      apt.id === id ? { ...apt, status: "cancelled" } : apt
    ));
  };

  const openEditModal = () => {
    setFormData({ ...patient });
    setImagePreview(patient.profileImage || "/placeholder.svg");
    setIsEditModalOpen(true);
  };

  const openBookingModal = () => {
    setIsBookingModalOpen(true);
    setBookingForm({
      specialty: "",
      doctor: "",
      date: "",
      time: "",
      problem: "",
      notes: ""
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        alert('Please select an image file');
        return;
      }
      
      if (file.size > 2 * 1024 * 1024) {
        alert('Image must be less than 2MB');
        return;
      }

      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, profileImage: file });
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPatient = {
      ...formData,
      profileImage: imagePreview || patient.profileImage,
    };
    setPatient(updatedPatient);
    setIsEditModalOpen(false);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const selectedDoctor = doctors.find(doc => doc.id === bookingForm.doctor);
      
      const newAppointment = {
        id: `apt-${Date.now()}`,
        doctor: selectedDoctor.name,
        specialty: bookingForm.specialty,
        date: new Date(bookingForm.date).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }),
        time: availableTimes.find(t => t.value === bookingForm.time).display,
        status: "upcoming"
      };
      
      setAppointments([...appointments, newAppointment]);
      setIsBookingModalOpen(false);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({ ...prev, [name]: value }));
  };

  const specialties = [...new Set(doctors.map(doc => doc.specialty))];

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
                      src={patient.profileImage || "/placeholder.svg"}
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
                <h2 className="text-xl font-bold text-center mt-4">{patient.name}</h2>
                <p className="text-sm text-gray-500 text-center">Patient ID: {patient.patientId}</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <div className="text-sm text-gray-600">{patient.email}</div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <div className="text-sm text-gray-600">{patient.phone}</div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                    <div className="text-sm text-gray-600">{patient.dob}</div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Address</label>
                    <div className="text-sm text-gray-600 whitespace-pre-line">
                      {patient.address}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-6 pb-6">
                <button 
                  onClick={openEditModal}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
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
                      <button 
                        onClick={openBookingModal}
                        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                      >
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

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setIsEditModalOpen(false)}
        >
          <div 
            className="bg-white rounded-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Profile</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
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

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Upload Section */}
              <div className="flex flex-col items-center">
                <div className="relative h-32 w-32 rounded-full overflow-hidden mb-4">
                  {isUploading ? (
                    <div className="flex items-center justify-center h-full bg-gray-100">
                      <svg className="animate-spin h-8 w-8 text-cyan-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  ) : (
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="object-cover w-full h-full"
                    />
                  )}
                  <label
                    htmlFor="image-upload"
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </label>
                </div>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <p className="text-sm text-gray-500 text-center">
                  Click image to upload a new profile photo (max 2MB)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="text"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows="3"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                  required
                />
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Book Appointment Modal */}
      {isBookingModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setIsBookingModalOpen(false)}
        >
          <div 
            className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Book New Appointment</h2>
              <button
                onClick={() => setIsBookingModalOpen(false)}
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

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Specialty Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medical Specialty Needed
                  </label>
                  <select
                    name="specialty"
                    value={bookingForm.specialty}
                    onChange={handleBookingChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                    required
                  >
                    <option value="">Select a specialty</option>
                    {specialties.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Doctor Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Doctor
                  </label>
                  <select
                    name="doctor"
                    value={bookingForm.doctor}
                    onChange={handleBookingChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                    required
                    disabled={!bookingForm.specialty}
                  >
                    <option value="">Select a doctor</option>
                    {availableDoctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Appointment Date
                  </label>
                  <select
                    name="date"
                    value={bookingForm.date}
                    onChange={handleBookingChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                    required
                    disabled={!bookingForm.doctor}
                  >
                    <option value="">Select a date</option>
                    {availableDates.map((date) => (
                      <option key={date.value} value={date.value}>
                        {date.display}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Appointment Time
                  </label>
                  <select
                    name="time"
                    value={bookingForm.time}
                    onChange={handleBookingChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                    required
                    disabled={!bookingForm.date}
                  >
                    <option value="">Select a time</option>
                    {availableTimes.map((time) => (
                      <option key={time.value} value={time.value}>
                        {time.display}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Problem Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Briefly describe your problem
                </label>
                <input
                  type="text"
                  name="problem"
                  value={bookingForm.problem}
                  onChange={handleBookingChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                  placeholder="e.g. Chest pain, skin rash, etc."
                  required
                />
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={bookingForm.notes}
                  onChange={handleBookingChange}
                  rows="3"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                  placeholder="Any other information you'd like to share..."
                />
              </div>

              {/* Doctor Preview (when selected) */}
              {bookingForm.doctor && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Doctor</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-16 w-16 rounded-full object-cover"
                        src={doctors.find(d => d.id === bookingForm.doctor)?.image || "/doctor-placeholder.jpg"}
                        alt="Doctor"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">
                        {doctors.find(d => d.id === bookingForm.doctor)?.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {bookingForm.specialty}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Booking...
                    </>
                  ) : "Book Appointment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}