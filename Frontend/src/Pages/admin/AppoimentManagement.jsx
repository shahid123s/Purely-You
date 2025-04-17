import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { FiCalendar, FiClock, FiUser, FiSearch, FiFilter } from 'react-icons/fi'
import Pagination from '../../components/Pagination'
import AdminSidebar from '../../components/admin/AdminSidebar'

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    status: 'all',
    date: '',
    doctor: ''
  })
  const appointmentsPerPage = 8

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Simulate API call
        const response = await fetch('/api/appointments');
        // Uncomment below line for real API call
        // const data = await response.json();
        
        // Dummy data if API fails
        const dummyAppointments = Array.from({ length: 15 }, (_, i) => ({
          id: i + 1,
          patientName: `Patient ${i + 1}`,
          doctorName: `Dr. ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'][i % 5]}`,
          date: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          time: `${9 + (i % 8)}:${i % 2 === 0 ? '00' : '30'}`,
          status: ['pending', 'confirmed', 'completed', 'cancelled'][i % 4],
          reason: ['Checkup', 'Follow-up', 'Emergency', 'Routine'][i % 4]
        }))
        
        // Use real data if available, otherwise dummy data
        setAppointments(dummyAppointments)
        setLoading(false)
      } catch (error) {
        toast.error('Failed to fetch appointments')
        setLoading(false)
      }
    }
    
    fetchAppointments()
  }, [])

  // Filter appointments
  const filteredAppointments = appointments.filter(apt => {
    return (
      (filters.status === 'all' || apt.status === filters.status) &&
      (filters.date === '' || apt.date.includes(filters.date)) &&
      (filters.doctor === '' || apt.doctorName.toLowerCase().includes(filters.doctor.toLowerCase()))
    )})

  // Get current appointments
  const indexOfLastAppointment = currentPage * appointmentsPerPage
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage
  const currentAppointments = filteredAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <div className="md:ml-64 p-4 md:p-6">
      <AdminSidebar/>
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-2xl font-bold">Appointment Management</h2>
          <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
            <div className="relative">
              <select
                className="pl-10 pr-4 py-2 border rounded-lg appearance-none bg-white"
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <FiFilter className="absolute left-3 top-3 text-gray-400" />
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Filter by doctor..."
                className="pl-10 pr-4 py-2 border rounded-lg"
                value={filters.doctor}
                onChange={(e) => setFilters({...filters, doctor: e.target.value})}
              />
              <FiUser className="absolute left-3 top-3 text-gray-400" />
            </div>
            <div className="relative">
              <input
                type="date"
                className="pl-10 pr-4 py-2 border rounded-lg"
                value={filters.date}
                onChange={(e) => setFilters({...filters, date: e.target.value})}
              />
              <FiCalendar className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Patient</th>
                    <th className="text-left p-3">Doctor</th>
                    <th className="text-left p-3">Date & Time</th>
                    <th className="text-left p-3">Reason</th>
                    <th className="text-left p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentAppointments.length > 0 ? (
                    currentAppointments.map(apt => (
                      <tr key={apt.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{apt.patientName}</td>
                        <td className="p-3">{apt.doctorName}</td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <FiCalendar className="mr-1 text-gray-500" />
                            <span className="mr-3">{apt.date}</span>
                            <FiClock className="mr-1 text-gray-500" />
                            <span>{apt.time}</span>
                          </div>
                        </td>
                        <td className="p-3">{apt.reason}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            apt.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                            apt.status === 'completed' ? 'bg-green-100 text-green-800' :
                            apt.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {apt.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-4 text-center text-gray-500">
                        No appointments found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <Pagination
              itemsPerPage={appointmentsPerPage}
              totalItems={filteredAppointments.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default AppointmentManagement