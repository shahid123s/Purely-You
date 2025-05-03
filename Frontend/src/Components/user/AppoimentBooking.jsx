import { useState, useEffect } from "react";
import { FiSearch, FiX, FiUser, FiCalendar, FiClock } from "react-icons/fi";
import patientAxiosInstance from "../../utils/patientAxios";
import { toast } from "sonner";

const DoctorDropdown = ({ 
  doctors = [], 
  selectedDoctor, 
  onSelect, 
  placeholder = "Select a dermatologist",
  isLoading = false
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const safeDoctors = Array.isArray(doctors) ? doctors : [];
  const filteredDoctors = safeDoctors.filter(doctor =>
    doctor?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor?.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
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

const DateDropdown = ({ selectedDate, onDateChange }) => {
  const getNext7Weekdays = () => {
    const dates = [];
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Normalize today's date
    
    while (dates.length < 7) {
      // Skip Sundays (where getDay() returns 0)
      if (currentDate.getDay() !== 0) {
        const dateStr = currentDate.toISOString().split('T')[0];
        dates.push(dateStr);
      }
      currentDate = new Date(currentDate);
      currentDate.setDate(currentDate.getDate() + 1); // Move to next day
    }
    
    return dates;
  };

  const availableDates = getNext7Weekdays();

  const formatDateDisplay = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <select
      value={selectedDate}
      onChange={(e) => onDateChange(e.target.value)}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
      required
    >
      <option value="">Select a date</option>
      {availableDates.map((date) => (
        <option key={date} value={date}>
          {formatDateDisplay(date)}
        </option>
      ))}
    </select>
  );
};

export default function AppointmentBookingModal({ 
  isOpen, 
  onClose, 
  onBookingSuccess 
}) {
  const [doctors, setDoctors] = useState([]);
  const [isLoadingDoctors, setIsLoadingDoctors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [bookingForm, setBookingForm] = useState({
    doctor: null,
    date: "",
    time: "",
    concern: "",
    notes: "",
  });

  const [availableTimes, setAvailableTimes] = useState([]);

  // Generate standard working hours (9am-5pm, excluding 12pm)
  const generateAvailableTimes = () => {
    const times = [];
    for (let hour = 9; hour <= 17; hour++) {
      if (hour === 12) continue; // Skip lunch hour
      times.push(`${hour}:00`, `${hour}:30`);
    }
    return times;
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsLoadingDoctors(true);
        const response = await patientAxiosInstance.get('/doctors');
        const doctorsData = Array.isArray(response.data?.data) ? response.data.data : [];
        setDoctors(doctorsData);
      } catch (error) {
        toast.error('Failed to load dermatologists');
        console.error('Error fetching doctors:', error);
        setDoctors([]);
      } finally {
        setIsLoadingDoctors(false);
      }
    };

    if (isOpen) {
      fetchDoctors();
      // Reset form when modal opens
      setBookingForm({
        doctor: null,
        date: "",
        time: "",
        concern: "",
        notes: "",
      });
      setAvailableTimes([]);
    }
  }, [isOpen]);

  useEffect(() => {
    // Generate available times when date is selected
    if (bookingForm.date) {
      setAvailableTimes(generateAvailableTimes());
      setBookingForm(prev => ({ ...prev, time: "" })); // Reset time when date changes
    } else {
      setAvailableTimes([]);
    }
  }, [bookingForm.date]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!bookingForm.doctor || !bookingForm.date || !bookingForm.time || !bookingForm.concern) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await patientAxiosInstance.post('/book-appointment', {
        doctorId: bookingForm.doctor._id,
        doctorName: bookingForm.doctor.name,  
        appointmentDate: bookingForm.date,
        appointmentTime: bookingForm.time,
        reason: bookingForm.concern,
        notes: bookingForm.notes,
        name:localStorage.getItem('patientName')

      });

      toast.success('Appointment booked successfully!');
      onBookingSuccess(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to book appointment');
      console.error('Error booking appointment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({ ...prev, [name]: value }));
  };

  const handleDoctorSelect = (doctor) => {
    setBookingForm({
      doctor,
      date: "",
      time: "",
      concern: bookingForm.concern,
      notes: bookingForm.notes,
    });
  };

  const handleDateSelect = (date) => {
    setBookingForm(prev => ({ 
      ...prev, 
      date,
      time: "" // Reset time when date changes
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Book Skin Care Consultation</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleBookingSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dermatologist*
              </label>
              <DoctorDropdown
                doctors={doctors}
                selectedDoctor={bookingForm.doctor}
                onSelect={handleDoctorSelect}
                placeholder="Select a dermatologist"
                isLoading={isLoadingDoctors}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Appointment Date*
              </label>
              <DateDropdown
                selectedDate={bookingForm.date}
                onDateChange={handleDateSelect}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Appointment Time*
              </label>
              <select
                name="time"
                value={bookingForm.time}
                onChange={handleInputChange}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 ${
                  !bookingForm.date ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                }`}
                required
                disabled={!bookingForm.date}
              >
                <option value="">{bookingForm.date ? "Select a time" : "First select a date"}</option>
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skin Concern*
            </label>
            <input
              type="text"
              name="concern"
              value={bookingForm.concern}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
                  {bookingForm.doctor.image ? (
                    <img
                      className="h-16 w-16 rounded-full object-cover"
                      src={bookingForm.doctor.image}
                      alt="Dermatologist"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                      <FiUser className="text-gray-500 h-8 w-8" />
                    </div>
                  )}
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
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting || !bookingForm.doctor || !bookingForm.date || !bookingForm.time || !bookingForm.concern}
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
  );
}