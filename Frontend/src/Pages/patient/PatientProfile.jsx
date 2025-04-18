import { useState, useEffect } from "react";
import { FiSearch, FiX, FiUser, FiCalendar, FiClock, FiEdit, FiTrash2 } from "react-icons/fi";
import patientAxiosInstance from "../../utils/patientAxios";
import { toast } from "sonner";
import AppointmentBookingModal from "../../components/user/AppoimentBooking";

const DoctorDropdown = ({ 
  doctors, 
  selectedDoctor, 
  onSelect, 
  placeholder = "Select a dermatologist",
  isLoading = false
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
        className={`flex items-center justify-between px-3 py-2 border ${isLoading ? 'bg-gray-100' : 'bg-white'} border-gray-300 rounded-md shadow-sm cursor-pointer`}
        onClick={() => !isLoading && setIsOpen(!isOpen)}
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
        ) : isLoading ? (
          <span className="text-gray-400">Loading dermatologists...</span>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
        {!isLoading && (
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
        )}
      </div>

      {isOpen && !isLoading && (
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
                key={doctor._id}
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

const Calendar = ({ selectedDate, onDateChange, availableDates }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(selectedDate ? new Date(selectedDate) : null);

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const isDateAvailable = (date) => {
    if (!availableDates || availableDates.length === 0) return false;
    const dateStr = date.toISOString().split('T')[0];
    return availableDates.some(d => d === dateStr);
  };

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

  const changeMonth = (increment) => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + increment,
        1
      )
    );
  };

  const renderDays = () => {
    const month = currentMonth.getMonth();
    const year = currentMonth.getFullYear();
    const daysCount = daysInMonth(month, year);
    const firstDay = firstDayOfMonth(month, year);
    
    const days = [];
    let day = 1;

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }

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
  
  // Change patient initial state to match API response
const [patient, setPatient] = useState({
  _id: "",
  name: "",
  email: "",
  phone: "",
  dob: "",
  gender: "",
  bloodGroup: "",
  status: "",
  createdAt: "",
  updatedAt: ""
});
  
  const [formData, setFormData] = useState({ ...patient });
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(true);

  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingReschedules, setPendingReschedules] = useState({});
  const [showRescheduleCalendar, setShowRescheduleCalendar] = useState(false);

  const [rescheduleForm, setRescheduleForm] = useState({
    date: "",
    time: "",
    reason: "",
  });

  // Fetch patient data
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setIsLoading(true);
        const response = await patientAxiosInstance.get('/profile');
        const patientData = response.data.data; // Access the data property from the response
        setPatient({
          _id: patientData._id,
          name: patientData.name,
          email: patientData.email,
          phone: patientData.phone,
          dob: patientData.dob,
          gender: patientData.gender,
          bloodGroup: patientData.bloodGroup,
          createdAt: patientData.createdAt,
          updatedAt: patientData.updatedAt
        });
        setFormData({
          _id: patientData._id,
          name: patientData.name,
          email: patientData.email,
          phone: patientData.phone,
          dob: patientData.dob,
          gender: patientData.gender,
          bloodGroup: patientData.bloodGroup
        });
      } catch (error) {
        toast.error('Failed to load patient profile');
        console.error('Error fetching patient data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsLoadingAppointments(true);
        const response = await patientAxiosInstance.get('/get-appoinments');
        setAppointments(response.data.data);
      } catch (error) {
        toast.error('Failed to load appointments');
        console.error('Error fetching appointments:', error);
      } finally {
        setIsLoadingAppointments(false);
      }
    };

    fetchAppointments();
  }, []);

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await patientAxiosInstance.get('/doctors');
        // Ensure we're getting an array and set it
        const doctorsData = Array.isArray(response.data?.data) ? response.data.data : [];
        setDoctors(doctorsData);
      } catch (error) {
        toast.error('Failed to load dermatologists');
        console.error('Error fetching doctors:', error);
        setDoctors([]); // Reset to empty array on error
      }
    };
  
    fetchDoctors();
  }, []);

  // Fetch available dates for rescheduling
  useEffect(() => {
    const fetchRescheduleDates = async () => {
      if (selectedAppointment && isRescheduleModalOpen) {
        try {
          const response = await patientAxiosInstance.get(
            `/doctors/${selectedAppointment.doctor._id}/available-dates`
          );
          setAvailableDates(response.data);
        } catch (error) {
          toast.error('Failed to load available dates');
          console.error('Error fetching reschedule dates:', error);
        }
      }
    };

    fetchRescheduleDates();
  }, [selectedAppointment, isRescheduleModalOpen]);

  // Fetch available times for rescheduling
  useEffect(() => {
    const fetchRescheduleTimes = async () => {
      if (rescheduleForm.date && selectedAppointment) {
        try {
          const response = await patientAxiosInstance.get(
            `/doctors/${selectedAppointment.doctor._id}/available-times`,
            { params: { date: rescheduleForm.date } }
          );
          setAvailableTimes(response.data);
        } catch (error) {
          toast.error('Failed to load available times');
          console.error('Error fetching reschedule times:', error);
        }
      }
    };

    fetchRescheduleTimes();
  }, [rescheduleForm.date, selectedAppointment]);

  const cancelAppointment = async (id) => {
    try {
      await patientAxiosInstance.patch(`/appointments/${id}/cancel`);
      setAppointments(appointments.map(apt => 
        apt._id === id ? { ...apt, status: "cancelled" } : apt
      ));
      toast.success('Appointment cancelled successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel appointment');
      console.error('Error cancelling appointment:', error);
    }
  };

  const viewMedicalRecord = (record) => {
    setSelectedMedicalRecord(record);
    setIsMedicalRecordModalOpen(true);
  };

  const openEditModal = () => {
    setFormData({ ...patient });
    setIsEditModalOpen(true);
  };

  const openBookingModal = () => {
    setIsBookingModalOpen(true);
  };

  const openRescheduleModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsRescheduleModalOpen(true);
    setRescheduleForm({ 
      date: "", 
      time: "", 
      reason: "" 
    });
    setShowRescheduleCalendar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await patientAxiosInstance.put('/profile', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        gender: formData.gender,
        bloodGroup: formData.bloodGroup
      });

      setPatient(response.data.data);
      setIsEditModalOpen(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
      console.error('Error updating profile:', error);
    }
  };

  const handleRescheduleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setPendingReschedules(prev => ({
      ...prev,
      [selectedAppointment._id]: true,
    }));

    try {
      await patientAxiosInstance.patch(`/appointments/${selectedAppointment._id}/reschedule`, {
        date: rescheduleForm.date,
        time: rescheduleForm.time,
        reason: rescheduleForm.reason
      });

      const updatedAppointments = appointments.map(apt =>
        apt._id === selectedAppointment._id
          ? { 
              ...apt, 
              date: rescheduleForm.date,
              time: rescheduleForm.time,
              status: "upcoming" 
            }
          : apt
      );

      setAppointments(updatedAppointments);
      setIsRescheduleModalOpen(false);
      toast.success('Appointment rescheduled successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reschedule appointment');
      console.error('Error rescheduling appointment:', error);
    } finally {
      setIsSubmitting(false);
      setPendingReschedules(prev => ({
        ...prev,
        [selectedAppointment._id]: false,
      }));
    }
  };

  const handleRescheduleChange = (e) => {
    const { name, value } = e.target;
    setRescheduleForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSuccess = (newAppointment) => {
    setAppointments([...appointments, newAppointment]);
  };

  const filteredAppointments = appointments.filter(apt => {
    if (appointmentFilter === "all") return true;
    return apt.status === appointmentFilter;
  });

  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <main>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {isLoading ? (
                <div className="p-6 flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-600"></div>
                </div>
              ) : (
                <>
                  <div className="p-6 pb-2">
                    <div className="flex justify-center">
                      <div className="relative h-24 w-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                        <FiUser className="text-gray-500 h-12 w-12" />
                      </div>
                    </div>
                    <h2 className="text-xl font-bold text-center mt-4">{patient.name}</h2>
                    <p className="text-sm text-gray-500 text-center">Patient ID: {patient._id}</p>
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
                        <label className="text-sm font-medium text-gray-700">Gender</label>
                        <div className="text-sm text-gray-600">{patient.gender}</div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Blood Group</label>
                        <div className="text-sm text-gray-600">{patient.bloodGroup}</div>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <button
                      onClick={openEditModal}
                      className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                      <FiEdit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </button>
                  </div>
                </>
              )}
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
                    {isLoadingAppointments ? (
                      <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-600"></div>
                      </div>
                    ) : filteredAppointments.length > 0 ? (
                      filteredAppointments.map((appointment) => (
                        <div
                          key={appointment._id}
                          className={`bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden ${
                            appointment.status === "cancelled" ? "opacity-60" : ""
                          }`}
                        >
                          <div className="p-6">
                            <div className="flex flex-col md:flex-row justify-between">
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <h4 className="font-semibold">{appointment.doctor.name}</h4>
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                      pendingReschedules[appointment._id]
                                        ? "bg-yellow-100 text-yellow-800"
                                        : appointment.status === "upcoming"
                                        ? "bg-green-100 text-green-800"
                                        : appointment.status === "completed"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {pendingReschedules[appointment._id]
                                      ? "Pending Reschedule"
                                      : appointment.status.charAt(0).toUpperCase() +
                                        appointment.status.slice(1)}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600">{appointment.doctor.specialty}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                  <div className="flex items-center">
                                    <FiCalendar className="mr-1 h-4 w-4" />
                                    {formatDate(appointment.date)}
                                  </div>
                                  <div className="flex items-center">
                                    <FiClock className="mr-1 h-4 w-4" />
                                    {appointment.time}
                                  </div>
                                </div>
                                {appointment.concern && (
                                  <p className="text-sm text-gray-600">
                                    <span className="font-medium">Concern:</span> {appointment.concern}
                                  </p>
                                )}
                              </div>

                              <div className="mt-4 md:mt-0 flex items-center space-x-2">
                                {appointment.status === "upcoming" && (
                                  <>
                                    <button
                                      onClick={() => openRescheduleModal(appointment)}
                                      disabled={pendingReschedules[appointment._id]}
                                      className={`px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${
                                        pendingReschedules[appointment._id]
                                          ? "opacity-50 cursor-not-allowed"
                                          : ""
                                      }`}
                                    >
                                      {pendingReschedules[appointment._id]
                                        ? "Rescheduling..."
                                        : "Reschedule"}
                                    </button>
                                    <button
                                      className={`px-3 py-1.5 border border-transparent text-sm font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                                        pendingReschedules[appointment._id]
                                          ? "opacity-50 cursor-not-allowed"
                                          : ""
                                      }`}
                                      onClick={() => cancelAppointment(appointment._id)}
                                      disabled={pendingReschedules[appointment._id]}
                                    >
                                      Cancel
                                    </button>
                                  </>
                                )}
                                {appointment.status === "completed" && appointment.medicalRecord && (
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
                <FiX className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                  type="date"
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
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Blood Group
                </label>
                <select
                  value={formData.bloodGroup}
                  onChange={(e) =>
                    setFormData({ ...formData, bloodGroup: e.target.value })
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                  required
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
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

      {/* Booking Modal */}
      <AppointmentBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onBookingSuccess={handleBookingSuccess}
      />

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
                        setRescheduleForm(prev => ({ ...prev, date, time: "" }));
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
                    <option key={time} value={time}>
                      {time}
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