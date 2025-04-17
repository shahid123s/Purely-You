import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { FiLock, FiUnlock, FiUser, FiSearch } from 'react-icons/fi'
import AdminSidebar from '../../components/admin/AdminSidebar'

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        // Simulate API call
        const response = await fetch('/api/doctors');
        // Uncomment below line for real API call
        // const data = await response.json();
        
        // Dummy data if API fails
        const specialties = ['Cardiology', 'Pediatrics', 'Dermatology', 'Neurology', 'Orthopedics']
        const dummyDoctors = Array.from({ length: 8 }, (_, i) => ({
          id: i + 1,
          name: `Dr. ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson'][i]}`,
          specialty: specialties[Math.floor(Math.random() * specialties.length)],
          email: `doctor${i + 1}@example.com`,
          status: i % 3 === 0 ? 'blocked' : 'active',
          experience: `${Math.floor(Math.random() * 15) + 5} years`,
          phone: `(${Math.floor(100 + Math.random() * 900)}) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`
        }))
        
        // Use real data if available, otherwise dummy data
        setDoctors(dummyDoctors)
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
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setDoctors(doctors.map(doctor => 
        doctor.id === doctorId 
          ? { ...doctor, status: doctor.status === 'active' ? 'blocked' : 'active' } 
          : doctor
      ))
      toast.success(`Doctor ${doctors.find(d => d.id === doctorId).status === 'active' ? 'blocked' : 'unblocked'} successfully`)
    } catch (error) {
      toast.error('Operation failed')
    }
  }

  const filteredDoctors = doctors.filter(doctor => {
    return (
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchTerm.toLowerCase()))
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
                <div key={doctor.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
                      <FiUser size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold">{doctor.name}</h3>
                      <p className="text-sm text-gray-600">{doctor.specialty}</p>
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
                      <span className="text-gray-500 w-24">Experience:</span>
                      <span>{doctor.experience}</span>
                    </p>
                    <p className="flex items-center">
                      <span className="text-gray-500 w-24">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        doctor.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {doctor.status}
                      </span>
                    </p>
                  </div>
                  <button 
                    onClick={() => handleBlock(doctor.id)}
                    className={`w-full py-2 rounded-lg flex items-center justify-center ${
                      doctor.status === 'active' 
                        ? 'text-red-600 bg-red-50 hover:bg-red-100' 
                        : 'text-green-600 bg-green-50 hover:bg-green-100'
                    }`}
                  >
                    {doctor.status === 'active' ? (
                      <>
                        <FiLock className="mr-2" />
                        Block Doctor
                      </>
                    ) : (
                      <>
                        <FiUnlock className="mr-2" />
                        Unblock Doctor
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