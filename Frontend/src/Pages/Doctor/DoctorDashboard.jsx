import { useEffect, useState } from "react";
import { Check, Clock, Calendar, User, Search, Copy, Video, FileText } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import doctorAxiosInstance from "../../utils/doctorAxiosInstance";
import { toast } from 'sonner';

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("today");
  const [isMedicalRecordModalOpen, setIsMedicalRecordModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [medicalRecord, setMedicalRecord] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsLoading(true);
        const response = await doctorAxiosInstance.get('/appointments');
        setAppointments(response.data.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        toast.error('Failed to load appointments');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  // Date helpers
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const isToday = (dateString) => {
    const today = new Date();
    const appointmentDate = new Date(dateString);
    
    return (
      today.getFullYear() === appointmentDate.getFullYear() &&
      today.getMonth() === appointmentDate.getMonth() &&
      today.getDate() === appointmentDate.getDate()
    );
  };

  // Appointment actions
  const generateMeetingLink = async (appointmentId) => {
    try {
      const meetingLink = `${window.location.origin}/doctor/call/${appointmentId}`;
      await navigator.clipboard.writeText(meetingLink);
  
      const response = await doctorAxiosInstance.put(`/appointments/ui-state`, {
        buttonState: "attended",
        attended: false,
        appointmentId
      });
  
      if (response.data.success) {
        setAppointments(prev => prev.map(apt => 
          apt._id === appointmentId 
            ? { ...apt, uiState: { buttonState: "attended", attended: false } }
            : apt
        ));
        toast.success('Meeting link copied to clipboard!');
      } else {
        toast.error('Failed to update appointment state');
      }
    } catch (error) {
      console.error('Error generating link:', error);
      toast.error('Failed to copy meeting link');
    }
  };
  
  const markAsAttended = async (appointmentId) => {
    try {
      const response = await doctorAxiosInstance.put(`/appointments/ui-state`, {
        buttonState: "submitRecord",
        attended: true,
        appointmentId
      });
  
      if (response.data.success) {
        setAppointments(prev => prev.map(apt => 
          apt._id === appointmentId 
            ? { ...apt, uiState: { buttonState: "submitRecord", attended: true } }
            : apt
        ));
      } else {
        toast.error('Failed to update appointment status');
      }
    } catch (error) {
      console.error('Error marking as attended:', error);
      toast.error('Failed to update appointment status');
    }
  };
  
  const acceptAppointment = async (appointmentId) => {
    try {
      console.log('varunna')
      const response = await doctorAxiosInstance.put(`/accept-appointments`, {
        action: "scheduled",
        appointmentId,
      });
      
      if (response.data.success) {
        setAppointments(prev => prev.map(apt => 
          apt._id === appointmentId ? { ...apt, status: "scheduled" } : apt
        ));
        toast.success('Appointment approved successfully');
      } else {
        toast.error(response.data.message || 'Failed to approve appointment');
      }
    } catch (error) {
      console.error('Error approving appointment:', error);
      toast.error('Failed to approve appointment');
    }
  };
  
  const rejectAppointment = async (appointmentId) => {
    try {
      const response = await doctorAxiosInstance.put(`/appointments/${appointmentId}`, {
        status: "rejected"
      });
      
      if (response.data.success) {
        setAppointments(prev => prev.map(apt => 
          apt._id === appointmentId ? { ...apt, status: "rejected" } : apt
        ));
        toast.success('Appointment rejected');
      } else {
        toast.error(response.data.message || 'Failed to reject appointment');
      }
    } catch (error) {
      console.error('Error rejecting appointment:', error);
      toast.error('Failed to reject appointment');
    }
  };

  const startVideoCall = (appointmentId) => {
    navigate(`/doctor/call/${appointmentId}`);
  };

  

const handleMedicalRecordSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await doctorAxiosInstance.put(`/appointments/${selectedAppointment._id}`, {
      notes: medicalRecord,
      status: "completed"
    });
    
    if (response.data.success) {
      setAppointments(prev => prev.map(apt => 
        apt._id === selectedAppointment._id 
          ? { ...apt, status: "completed", notes: medicalRecord, uiState: undefined }
          : apt
      ));
      
      toast.success('Appointment completed successfully');
      setIsMedicalRecordModalOpen(false);
      setMedicalRecord("");
      setSelectedAppointment(null);
    } else {
      toast.error(response.data.message || 'Failed to complete appointment');
    }
  } catch (error) {
    console.error('Error updating appointment:', error);
    toast.error('Failed to complete appointment');
  }
};

const markNoShow = async (appointmentId) => {
  try {
    const response = await doctorAxiosInstance.put(`/appointments/${appointmentId}`, { 
      status: "no-show" 
    });
    
    if (response.data.success) {
      setAppointments(prev => prev.map(apt => 
        apt._id === appointmentId ? { ...apt, status: "no-show" } : apt
      ));
      toast.success('Marked as no-show');
    } else {
      toast.error(response.data.message || 'Failed to update appointment status');
    }
  } catch (error) {
    console.error('Error marking no-show:', error);
    toast.error('Failed to update appointment status');
  }
};

  // Filter appointments
  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patientName.toLowerCase().includes(searchTerm.toLowerCase());
    const appointmentDate = new Date(apt.appointmentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (activeTab === "today") {
      return isToday(apt.appointmentDate) && apt.status === "scheduled" && matchesSearch;
    }
    
    if (activeTab === "upcoming") {
      return (
        (apt.status === "pending" || apt.status === "scheduled") &&
        appointmentDate > today &&
        !isToday(apt.appointmentDate) &&
        matchesSearch
      );
    }
    
    if (activeTab === "past") {
      return ["completed", "no-show", "rejected"].includes(apt.status) && matchesSearch;
    }
    
    return matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
            <p className="text-gray-600">Manage your appointments and patient records</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              <User className="text-gray-600" />
            </div>
            <div>
              <p className="font-medium">Dr. {appointments[0]?.doctorName || 'User'}</p>
              <p className="text-sm text-gray-600">Dermatologist</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Today's Appointments"
            value={appointments.filter(apt => isToday(apt.appointmentDate) && apt.status === "scheduled").length}
            icon={<Calendar className="h-5 w-5" />}
            color="blue"
          />
          <StatCard 
            title="Pending Approvals"
            value={appointments.filter(apt => apt.status === "pending" && !isToday(apt.appointmentDate)).length}
            icon={<Clock className="h-5 w-5" />}
            color="yellow"
          />
          <StatCard 
            title="Completed"
            value={appointments.filter(apt => apt.status === "completed").length}
            icon={<Check className="h-5 w-5" />}
            color="green"
          />
          <StatCard 
            title="Total Patients"
            value={new Set(appointments.map(apt => apt.patientId)).size}
            icon={<User className="h-5 w-5" />}
            color="purple"
          />
        </div>

        {/* Appointments Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="grid grid-cols-3">
              <TabButton 
                active={activeTab === "today"}
                onClick={() => setActiveTab("today")}
              >
                Today's Schedule
              </TabButton>
              <TabButton 
                active={activeTab === "upcoming"}
                onClick={() => setActiveTab("upcoming")}
              >
                Upcoming
              </TabButton>
              <TabButton 
                active={activeTab === "past"}
                onClick={() => setActiveTab("past")}
              >
                Past Appointments
              </TabButton>
            </div>
          </div>

          <div className="p-6">
            {/* Search and Filter */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {activeTab === "today" ? "Today's Appointments" : 
                 activeTab === "upcoming" ? "Upcoming Appointments" : "Past Appointments"}
              </h2>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder="Search patients..."
                  className="pl-10 w-[250px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Appointments List */}
            {filteredAppointments.length > 0 ? (
              <div className="space-y-4">
                {filteredAppointments.map(appointment => (
                  <AppointmentCard 
                    key={appointment._id}
                    appointment={appointment}
                    onComplete={() => {
                      setSelectedAppointment(appointment);
                      setIsMedicalRecordModalOpen(true);
                    }}
                    onStartCall={startVideoCall}
                    onNoShow={markNoShow}
                    onCopyLink={generateMeetingLink}
                    onMarkAttended={markAsAttended}
                    onAccept={acceptAppointment}
                    onReject={rejectAppointment}
                    activeTab={activeTab}
                    buttonState={appointment.uiState?.buttonState || 'giveLink'}
                  />
                ))}
              </div>
            ) : (
              <EmptyState message={
                searchTerm ? 
                "No appointments match your search" : 
                activeTab === "today" ? 
                "No appointments scheduled for today" : 
                activeTab === "upcoming" ?
                "No upcoming appointments" :
                "No past appointments found"
              } />
            )}
          </div>
        </div>
      </div>

      {/* Medical Record Modal */}
      <MedicalRecordModal
        isOpen={isMedicalRecordModalOpen}
        onClose={() => {
          setIsMedicalRecordModalOpen(false);
          setSelectedAppointment(null);
          setMedicalRecord("");
        }}
        onSubmit={handleMedicalRecordSubmit}
        medicalRecord={medicalRecord}
        setMedicalRecord={setMedicalRecord}
        patientName={selectedAppointment?.patientName}
      />
    </main>
  );
}

// Sub-components remain the same as before
const StatCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600' },
    red: { bg: 'bg-red-100', text: 'text-red-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className={`h-12 w-12 rounded-full ${colorClasses[color].bg} flex items-center justify-center ${colorClasses[color].text}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ children, active, onClick }) => (
  <button
    className={`py-4 text-center text-sm font-medium ${
      active ? "text-cyan-600 border-b-2 border-cyan-500" : "text-gray-500 hover:text-gray-700"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

const AppointmentCard = ({ 
  appointment, 
  onComplete, 
  onStartCall, 
  onNoShow, 
  onCopyLink,
  onMarkAttended,
  onAccept,
  onReject,
  activeTab,
  buttonState
}) => {
  const isPending = appointment.status === "pending";
  const isTodayAppointment = activeTab === "today";
  const isUpcomingAppointment = activeTab === "upcoming";
  const isPastAppointment = activeTab === "past";

  const renderTodayButtons = () => {
    switch (buttonState) {
      case 'giveLink':
        return (
          <button
            className="flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            onClick={() => onCopyLink(appointment._id)}
          >
            <Copy className="mr-1 h-4 w-4" />
            Give Link
          </button>
        );
      case 'attended':
        return (
          <button
            className="flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => onMarkAttended(appointment._id)}
          >
            <Video className="mr-1 h-4 w-4" />
            Attended
          </button>
        );
      case 'submitRecord':
        return (
          <button
            className="flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            onClick={() => onComplete()}
          >
            <FileText className="mr-1 h-4 w-4" />
            Submit Record
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex items-start space-x-4">
            <div className="relative h-12 w-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              <User className="text-gray-600" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold">{appointment.patientName}</h4>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  appointment.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                  appointment.status === "scheduled" ? "bg-blue-100 text-blue-800" :
                  appointment.status === "completed" ? "bg-green-100 text-green-800" :
                  appointment.status === "no-show" ? "bg-red-100 text-red-800" :
                  "bg-gray-100 text-gray-800"
                }`}>
                  {appointment.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">{appointment.reason}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                <div className="flex items-center">
                  {new Date(appointment.appointmentDate).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  {appointment.appointmentTime}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            {isUpcomingAppointment && isPending && (
              <>
                <button
                  className="flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  onClick={() => {onAccept(appointment._id)}}
                >
                  <Check className="mr-1 h-4 w-4" />
                  Approve
                </button>
                <button
                  className="flex items-center px-3 py-1.5 border border-red-200 text-sm font-medium rounded text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={() => onReject(appointment._id)}
                >
                  Reject
                </button>
              </>
            )}

            {isTodayAppointment && (
              <>
                {renderTodayButtons()}
                <button
                  className="flex items-center px-3 py-1.5 border border-red-200 text-sm font-medium rounded text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={() => onNoShow(appointment._id)}
                >
                  No-Show
                </button>
              </>
            )}

            {isPastAppointment && (
              <button
                className="flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                onClick={() => onComplete()}
              >
                <FileText className="mr-1 h-4 w-4" />
                View Record
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const EmptyState = ({ message }) => (
  <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
    <div className="p-6 text-center">
      <p className="text-gray-500">{message}</p>
    </div>
  </div>
);

const MedicalRecordModal = ({ isOpen, onClose, onSubmit, medicalRecord, setMedicalRecord, patientName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div 
        className="bg-white rounded-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            Medical Record for {patientName}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              value={medicalRecord}
              onChange={(e) => setMedicalRecord(e.target.value)}
              rows="5"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Enter medical notes..."
              required
            />
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
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
  );
};