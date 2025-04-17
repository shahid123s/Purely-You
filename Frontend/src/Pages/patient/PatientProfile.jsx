import { useState, useEffect } from "react";
import { fetchPatientProfile } from "../../services/FetchDatas";
import { FiSearch, FiX, FiUser, FiCalendar, FiClock } from "react-icons/fi";

// Searchable Doctor Dropdown Component
const DoctorDropdown = ({ 
  doctors, 
  selectedDoctor, 
  onSelect, 
  placeholder = "Select a dermatologist" 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <div 
        className="flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md shadow-sm cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedDoctor ? (
          <div className="flex items-center">
            {selectedDoctor.image && (
              <img 
                src={selectedDoctor.image} 
                alt={selectedDoctor.name}
                className="w-8 h-8 rounded-full mr-2 object-cover"
              />
            )}
            <div>
              <p className="text-sm font-medium">{selectedDoctor.name}</p>
              <p className="text-xs text-gray-500">{selectedDoctor.specialty}</p>
            </div>
          </div>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
        <svg
          className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 max-h-60 overflow-auto">
          <div className="px-3 py-2 border-b">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                placeholder="Search dermatologists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onSelect(doctor);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center">
                  {doctor.image ? (
                    <img 
                      src={doctor.image} 
                      alt={doctor.name}
                      className="w-8 h-8 rounded-full mr-2 object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                      <FiUser className="text-gray-500" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium">{doctor.name}</p>
                    <p className="text-xs text-gray-500">{doctor.specialty}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500">
              No dermatologists found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Calendar component
const Calendar = ({ selectedDate, onDateChange, availableDates }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(selectedDate ? new Date(selectedDate) : null);

  // Get days in month
  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month
  const firstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  // Check if date is available
  const isDateAvailable = (date) => {
    if (!availableDates || availableDates.length === 0) return false;
    const dateStr = date.toISOString().split('T')[0];
    return availableDates.some(d => d.value === dateStr);
  };

  // Handle date selection
  const handleDateClick = (day) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    
    if (isDateAvailable(newDate)) {
      setSelectedDay(newDate);
      onDateChange(newDate.toISOString().split('T')[0]);
    }
  };

  // Change month
  const changeMonth = (increment) => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + increment,
        1
      )
    );
  };

  // Generate calendar days
  const renderDays = () => {
    const month = currentMonth.getMonth();
    const year = currentMonth.getFullYear();
    const daysCount = daysInMonth(month, year);
    const firstDay = firstDayOfMonth(month, year);
    
    const days = [];
    let day = 1;

    // Create empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }

    // Create cells for each day of the month
    for (; day <= daysCount; day++) {
      const currentDate = new Date(year, month, day);
      const isAvailable = isDateAvailable(currentDate);
      const isSelected = selectedDay && 
        selectedDay.getDate() === day && 
        selectedDay.getMonth() === month && 
        selectedDay.getFullYear() === year;

      days.push(
        <button
          key={`day-${day}`}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm
            ${isSelected ? 'bg-cyan-600 text-white' : ''}
            ${isAvailable ? 
              (isSelected ? 'bg-cyan-600 text-white' : 'hover:bg-gray-100 cursor-pointer') : 
              'text-gray-400 cursor-not-allowed'}
          `}
          onClick={() => isAvailable && handleDateClick(day)}
          disabled={!isAvailable}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => changeMonth(-1)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <h3 className="font-medium">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        <button 
          onClick={() => changeMonth(1)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {renderDays()}
      </div>
    </div>
  );
};

export default function PatientProfile() {
  const [activeTab] = useState("appointments");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [isMedicalRecordModalOpen, setIsMedicalRecordModalOpen] = useState(false);
  const [selectedMedicalRecord, setSelectedMedicalRecord] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointmentFilter, setAppointmentFilter] = useState("all");
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
  const [notification, setNotification] = useState(null);

  // Updated doctors array with skin care specialties
  const [doctors] = useState([
    {
      id: "doc-1",
      name: "Dr. Sophia Chen",
      specialty: "Medical Dermatology",
      availableDays: ["Monday", "Wednesday", "Friday"],
      image: "/dermatologist1.jpg",
    },
    {
      id: "doc-2",
      name: "Dr. Michael Rodriguez",
      specialty: "Cosmetic Dermatology",
      availableDays: ["Tuesday", "Thursday", "Saturday"],
      image: "/dermatologist2.jpg",
    },
    {
      id: "doc-3",
      name: "Dr. Priya Patel",
      specialty: "Pediatric Dermatology",
      availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      image: "/dermatologist3.jpg",
    },
    {
      id: "doc-4",
      name: "Dr. James Wilson",
      specialty: "Acne Specialist",
      availableDays: ["Wednesday", "Thursday", "Friday"],
      image: "/dermatologist4.jpg",
    },
    {
      id: "doc-5",
      name: "Dr. Olivia Kim",
      specialty: "Anti-Aging Specialist",
      availableDays: ["Monday", "Tuesday", "Friday"],
      image: "/dermatologist5.jpg",
    },
  ]);

  const [appointments, setAppointments] = useState([
    {
      id: "apt-1",
      doctor: "Dr. Sophia Chen",
      specialty: "Medical Dermatology",
      date: "April 15, 2025",
      time: "10:30 AM",
      status: "upcoming",
      medicalRecord: "",
    },
    {
      id: "apt-2",
      doctor: "Dr. Michael Rodriguez",
      specialty: "Cosmetic Dermatology",
      date: "March 22, 2025",
      time: "2:00 PM",
      status: "completed",
      medicalRecord: "Patient has mild acne, prescribed topical retinoid cream.",
    },
    {
      id: "apt-3",
      doctor: "Dr. Priya Patel",
      specialty: "Pediatric Dermatology",
      date: "May 5, 2025",
      time: "11:15 AM",
      status: "upcoming",
      medicalRecord: "",
    },
  ]);

  const [bookingForm, setBookingForm] = useState({
    doctor: null,
    date: "",
    time: "",
    concern: "",
    notes: "",
  });

  const [rescheduleForm, setRescheduleForm] = useState({
    date: "",
    time: "",
    reason: "",
  });

  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingReschedules, setPendingReschedules] = useState({});
  const [showCalendar, setShowCalendar] = useState(false);
  const [showRescheduleCalendar, setShowRescheduleCalendar] = useState(false);

  // Fetch available dates when doctor is selected
  useEffect(() => {
    if (bookingForm.doctor) {
      const dates = [];
      const today = new Date();
      for (let i = 1; i <= 14; i++) {
        const date = new Date();
        date.setDate(today.getDate() + i);
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
        if (
          bookingForm.doctor.availableDays.includes(dayName) &&
          dayName !== "Sunday"
        ) {
          dates.push({
            value: date.toISOString().split("T")[0],
            display: date.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
          });
        }
      }
      setAvailableDates(dates);
      setBookingForm(prev => ({ ...prev, date: "", time: "" }));
    } else {
      setAvailableDates([]);
    }
  }, [bookingForm.doctor]);

  // Fetch available dates for rescheduling
  useEffect(() => {
    if (selectedAppointment && isRescheduleModalOpen) {
      const doctor = doctors.find(doc => doc.name === selectedAppointment.doctor);
      if (doctor) {
        const dates = [];
        const today = new Date();
        for (let i = 1; i <= 14; i++) {
          const date = new Date();
          date.setDate(today.getDate() + i);
          const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
          if (
            doctor.availableDays.includes(dayName) &&
            dayName !== "Sunday"
          ) {
            dates.push({
              value: date.toISOString().split("T")[0],
              display: date.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
            });
          }
        }
        setAvailableDates(dates);
        setRescheduleForm(prev => ({ ...prev, date: "", time: "" }));
      }
    }
  }, [selectedAppointment, isRescheduleModalOpen, doctors]);

  // Fetch available times when a date is selected
  useEffect(() => {
    if (bookingForm.date || rescheduleForm.date) {
      const times = [];
      for (let hour = 9; hour <= 16; hour++) {
        times.push({
          value: `${hour}:00`,
          display: `${hour}:00 AM`,
        });
        times.push({
          value: `${hour}:30`,
          display: `${hour}:30 AM`,
        });
      }
      const formattedTimes = times.map((time) => {
        let [hours, minutes] = time.value.split(":");
        hours = parseInt(hours);
        const ampm = hours >= 12 ? "PM" : "AM";
        const displayHours = hours % 12 || 12;
        return {
          value: time.value,
          display: `${displayHours}:${minutes} ${ampm}`,
        };
      });
      setAvailableTimes(formattedTimes);
      if (isRescheduleModalOpen) {
        setRescheduleForm(prev => ({ ...prev, time: "" }));
      } else {
        setBookingForm(prev => ({ ...prev, time: "" }));
      }
    } else {
      setAvailableTimes([]);
    }
  }, [bookingForm.date, rescheduleForm.date, isRescheduleModalOpen]);

  const cancelAppointment = (id) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: "cancelled" } : apt
      )
    );
  };

  const viewMedicalRecord = (record) => {
    setSelectedMedicalRecord(record);
    setIsMedicalRecordModalOpen(true);
  };

  const openEditModal = () => {
    setFormData({ ...patient });
    setImagePreview(patient.profileImage || "/placeholder.svg");
    setIsEditModalOpen(true);
  };

  const openBookingModal = () => {
    setIsBookingModalOpen(true);
    setBookingForm({
      doctor: null,
      date: "",
      time: "",
      concern: "",
      notes: "",
    });
    setShowCalendar(false);
  };

  const openRescheduleModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsRescheduleModalOpen(true);
    setRescheduleForm({ date: "", time: "", reason: "" });
    setShowRescheduleCalendar(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match("image.*")) {
        alert("Please select an image file");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert("Image must be less than 2MB");
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
    setTimeout(() => {
      const newAppointment = {
        id: `apt-${Date.now()}`,
        doctor: bookingForm.doctor.name,
        specialty: bookingForm.doctor.specialty,
        date: new Date(bookingForm.date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        time: availableTimes.find((t) => t.value === bookingForm.time).display,
        status: "upcoming",
        medicalRecord: "",
      };
      setAppointments([...appointments, newAppointment]);
      setIsBookingModalOpen(false);
      setIsSubmitting(false);
      setNotification({
        type: "success",
        message: "Appointment booked successfully!",
      });
      setTimeout(() => setNotification(null), 3000);
    }, 1000);
  };

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setPendingReschedules((prev) => ({
      ...prev,
      [selectedAppointment.id]: true,
    }));

    // Simulate API call
    const dummyApiCall = () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const success = Math.random() > 0.2; // 80% success rate for demo
          if (success) {
            resolve();
          } else {
            reject(new Error("Failed to reschedule appointment."));
          }
        }, 1500);
      });

    dummyApiCall()
      .then(() => {
        setAppointments(
          appointments.map((apt) =>
            apt.id === selectedAppointment.id
              ? {
                  ...apt,
                  date: new Date(rescheduleForm.date).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  ),
                  time: availableTimes.find(
                    (t) => t.value === rescheduleForm.time
                  ).display,
                  status: "upcoming",
                }
              : apt
          )
        );
        setIsRescheduleModalOpen(false);
        setIsSubmitting(false);
        setPendingReschedules((prev) => ({
          ...prev,
          [selectedAppointment.id]: false,
        }));
        setNotification({
          type: "success",
          message: "Appointment rescheduled successfully!",
        });
      })
      .catch((error) => {
        setIsSubmitting(false);
        setPendingReschedules((prev) => ({
          ...prev,
          [selectedAppointment.id]: false,
        }));
        setNotification({
          type: "error",
          message: error.message,
        });
      })
      .finally(() => {
        setTimeout(() => setNotification(null), 3000);
      });
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRescheduleChange = (e) => {
    const { name, value } = e.target;
    setRescheduleForm((prev) => ({ ...prev, [name]: value }));
  };

  const filteredAppointments =
    appointmentFilter === "all"
      ? appointments
      : appointments.filter((apt) => apt.status === appointmentFilter);

  return (
    <main>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Notification */}
        {notification && (
          <div
            className={`fixed top-4 right-4 p-4 rounded-md shadow-lg text-white ${
              notification.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {notification.message}
          </div>
        )}

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

          {/* Appointments Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">My Appointments</h3>
                    <div className="flex items-center space-x-4">
                      <select
                        value={appointmentFilter}
                        onChange={(e) => setAppointmentFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                      >
                        <option value="all">All Appointments</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <button
                        onClick={openBookingModal}
                        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                      >
                        Book New Appointment
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {filteredAppointments.length > 0 ? (
                      filteredAppointments.map((appointment) => (
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
                                      pendingReschedules[appointment.id]
                                        ? "bg-yellow-100 text-yellow-800"
                                        : appointment.status === "upcoming"
                                        ? "bg-green-100 text-green-800"
                                        : appointment.status === "completed"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {pendingReschedules[appointment.id]
                                      ? "Pending Reschedule"
                                      : appointment.status.charAt(0).toUpperCase() +
                                        appointment.status.slice(1)}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600">{appointment.specialty}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                  <div className="flex items-center">
                                    <FiCalendar className="mr-1 h-4 w-4" />
                                    {appointment.date}
                                  </div>
                                  <div className="flex items-center">
                                    <FiClock className="mr-1 h-4 w-4" />
                                    {appointment.time}
                                  </div>
                                </div>
                              </div>

                              <div className="mt-4 md:mt-0 flex items-center space-x-2">
                                {appointment.status === "upcoming" && (
                                  <>
                                    <button
                                      onClick={() => openRescheduleModal(appointment)}
                                      disabled={pendingReschedules[appointment.id]}
                                      className={`px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${
                                        pendingReschedules[appointment.id]
                                          ? "opacity-50 cursor-not-allowed"
                                          : ""
                                      }`}
                                    >
                                      {pendingReschedules[appointment.id]
                                        ? "Rescheduling..."
                                        : "Reschedule"}
                                    </button>
                                    <button
                                      className={`px-3 py-1.5 border border-transparent text-sm font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                                        pendingReschedules[appointment.id]
                                          ? "opacity-50 cursor-not-allowed"
                                          : ""
                                      }`}
                                      onClick={() => cancelAppointment(appointment.id)}
                                      disabled={pendingReschedules[appointment.id]}
                                    >
                                      Cancel
                                    </button>
                                  </>
                                )}
                                {appointment.status === "completed" && (
                                  <button
                                    className="px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                                    onClick={() => viewMedicalRecord(appointment.medicalRecord)}
                                  >
                                    View Details
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-6 text-center">
                          <p className="text-gray-500">No appointments found.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
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
              <div className="flex flex-col items-center">
                <div className="relative h-32 w-32 rounded-full overflow-hidden mb-4">
                  {isUploading ? (
                    <div className="flex items-center justify-center h-full bg-gray-100">
                      <svg
                        className="animate-spin h-8 w-8 text-cyan-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
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
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
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
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
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
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
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
                  onChange={(e) =>
                    setFormData({ ...formData, dob: e.target.value })
                  }
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
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
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
              <h2 className="text-xl font-bold">Book Skin Care Consultation</h2>
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dermatologist
                  </label>
                  <DoctorDropdown
                    doctors={doctors}
                    selectedDoctor={bookingForm.doctor}
                    onSelect={(doctor) => setBookingForm({...bookingForm, doctor, date: "", time: ""})}
                    placeholder="Select a dermatologist"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Appointment Date
                  </label>
                  <input
                    type="text"
                    name="date"
                    value={bookingForm.date ? 
                      new Date(bookingForm.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      }) : ''}
                    onClick={() => setShowCalendar(!showCalendar)}
                    readOnly
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 cursor-pointer"
                    placeholder="Select a date"
                    required
                    disabled={!bookingForm.doctor}
                  />
                  {showCalendar && (
                    <div className="mt-2 z-10">
                      <Calendar
                        selectedDate={bookingForm.date}
                        onDateChange={(date) => {
                          setBookingForm(prev => ({ ...prev, date }));
                          setShowCalendar(false);
                        }}
                        availableDates={availableDates}
                      />
                    </div>
                  )}
                </div>

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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skin Concern
                </label>
                <input
                  type="text"
                  name="concern"
                  value={bookingForm.concern}
                  onChange={handleBookingChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                  placeholder="e.g. Acne, rosacea, anti-aging, etc."
                  required
                />
              </div>

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
                  placeholder="Any other information about your skin condition..."
                />
              </div>

              {bookingForm.doctor && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Dermatologist</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-16 w-16 rounded-full object-cover"
                        src={bookingForm.doctor.image || "/dermatologist-placeholder.jpg"}
                        alt="Dermatologist"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">
                        {bookingForm.doctor.name}
                      </h4>
                      <p className="text-sm text-gray-500">{bookingForm.doctor.specialty}</p>
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
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Booking...
                    </>
                  ) : (
                    "Book Consultation"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reschedule Appointment Modal */}
      {isRescheduleModalOpen && selectedAppointment && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setIsRescheduleModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Reschedule Appointment</h2>
              <button
                onClick={() => setIsRescheduleModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleRescheduleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Appointment Date
                </label>
                <input
                  type="text"
                  name="date"
                  value={rescheduleForm.date ? 
                    new Date(rescheduleForm.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    }) : ''}
                  onClick={() => setShowRescheduleCalendar(!showRescheduleCalendar)}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 cursor-pointer"
                  placeholder="Select a date"
                  required
                />
                {showRescheduleCalendar && (
                  <div className="mt-2 z-10">
                    <Calendar
                      selectedDate={rescheduleForm.date}
                      onDateChange={(date) => {
                        setRescheduleForm(prev => ({ ...prev, date }));
                        setShowRescheduleCalendar(false);
                      }}
                      availableDates={availableDates}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Appointment Time
                </label>
                <select
                  name="time"
                  value={rescheduleForm.time}
                  onChange={handleRescheduleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                  required
                  disabled={!rescheduleForm.date}
                >
                  <option value="">Select a time</option>
                  {availableTimes.map((time) => (
                    <option key={time.value} value={time.value}>
                      {time.display}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Rescheduling (Optional)
                </label>
                <textarea
                  name="reason"
                  value={rescheduleForm.reason}
                  onChange={handleRescheduleChange}
                  rows="3"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                  placeholder="e.g. Schedule conflict, personal reasons..."
                />
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsRescheduleModalOpen(false)}
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
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Rescheduling...
                    </>
                  ) : (
                    "Reschedule Appointment"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
              <h2 className="text-xl font-bold">Treatment Summary</h2>
              <button
                onClick={() => setIsMedicalRecordModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <div className="text-gray-700 whitespace-pre-wrap">
              {selectedMedicalRecord || "No treatment summary available."}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsMedicalRecordModalOpen(false)}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}