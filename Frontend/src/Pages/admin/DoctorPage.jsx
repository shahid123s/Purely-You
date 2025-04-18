import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { FiLock, FiUnlock, FiUser, FiSearch } from 'react-icons/fi'
import AdminSidebar from '../../components/admin/AdminSidebar'
import adminAxiosInstance from '../../utils/adminAxiosInstance'

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await adminAxiosInstance.get('/approved-doctors')
        setDoctors(response.data.data)
        setLoading(false)
      } catch (error) {
        toast.error('Failed to fetch doctors')
        setLoading(false)
      }
    }
    fetchDoctors()
  }, [])

  const handleBlock = async (doctorId) => {
    try {
      const response = await adminAxiosInstance.patch(`/block-doctor/${doctorId}`)
      if (response.data.success) {
        setDoctors(doctors.map(doctor => 
          doctor._id === doctorId 
            ? { ...doctor, isBlocked: !doctor.isBlocked } 
            : doctor
        ))
        toast.success(`Doctor ${doctor.isBlocked ? 'unblocked' : 'blocked'} successfully`)
      }
    } catch (error) {
      toast.error('Operation failed')
    }
  }

  const filteredDoctors = doctors.filter(doctor => {
    const searchContent = `${doctor.name} ${doctor.email} ${doctor.experince}`.toLowerCase()
    return searchContent.includes(searchTerm.toLowerCase())
  })

  return (
    <div className="md:ml-64 p-4 md:p-6">
      <AdminSidebar/>
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold">Approved Doctors</h2>
            <p className="text-gray-600">
              {filteredDoctors.length} {filteredDoctors.length === 1 ? 'doctor' : 'doctors'} found
            </p>
          </div>
          
          <div className="relative flex-grow md:w-64">
            <input
              type="text"
              placeholder="Search doctors..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map(doctor => (
                <div key={doctor._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
                      <FiUser size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold">{doctor.name}</h3>
                      <p className="text-sm text-gray-600">{doctor.experince} experience</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm mb-4">
                    <p className="flex items-center">
                      <span className="text-gray-500 w-24">Email:</span>
                      <span>{doctor.email}</span>
                    </p>
                    <p className="flex items-center">
                      <span className="text-gray-500 w-24">Phone:</span>
                      <span>{doctor.phone}</span>
                    </p>
                    <p className="flex items-center">
                      <span className="text-gray-500 w-24">License:</span>
                      <span>{doctor.licenseNumber}</span>
                    </p>
                    <p className="flex items-center">
                      <span className="text-gray-500 w-24">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        !doctor.isBlocked ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {doctor.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </p>
                  </div>
                  <button 
                    onClick={() => handleBlock(doctor._id)}
                    className={`w-full py-2 rounded-lg flex items-center justify-center ${
                      doctor.isBlocked 
                        ? 'text-green-600 bg-green-50 hover:bg-green-100' 
                        : 'text-red-600 bg-red-50 hover:bg-red-100'
                    }`}
                  >
                    {doctor.isBlocked ? (
                      <>
                        <FiUnlock className="mr-2" />
                        Unblock Doctor
                      </>
                    ) : (
                      <>
                        <FiLock className="mr-2" />
                        Block Doctor
                      </>
                    )}
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full p-8 text-center text-gray-500">
                No doctors found matching your criteria
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default DoctorsPage