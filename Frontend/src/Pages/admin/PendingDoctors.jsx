import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { FiUser, FiSearch, FiEye, FiCheck, FiX } from 'react-icons/fi'
import AdminSidebar from '../../components/admin/AdminSidebar'
import adminAxiosInstance from '../../utils/adminAxiosInstance'

const PendingDoctorsPage = () => {
  const [pendingDoctors, setPendingDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchPendingDoctors = async () => {
      try {
        // Simulate API call
        const response = await adminAxiosInstance.get('/pending-doctors');
        // Uncomment below line for real API call
        // const data = await response.json();
        if(!response.data.success){
          toast.error('Failed to fetch pending doctors')
          return 
        }
        setPendingDoctors(response.data.doctors)

        
        // Dummy data if API fails
        // const specialties = ['Dermatology', 'Dermatology', 'Dermatology', 'Dermatology', 'Dermatology']
        // const dummyDoctors = Array.from({ length: 5 }, (_, i) => ({
        //   id: i + 1,
        //   name: `Dr. ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'][i]}`,
        //   specialty: specialties[Math.floor(Math.random() * specialties.length)],
        //   email: `newdoctor${i + 1}@example.com`,
        //   phone: `(${Math.floor(100 + Math.random() * 900)}) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
        //   experience: `${Math.floor(Math.random() * 15) + 5} years`,
        //   education: 'MD from Harvard Medical School',
        //   license: `LIC-${Math.floor(10000 + Math.random() * 90000)}`,
        //   documents: ['Medical Degree', 'License Certificate', 'ID Proof']
        // }))
        
        // Use real data if available, otherwise dummy data
        setPendingDoctors(dummyDoctors)
        setLoading(false)
      } catch (error) {
        toast.error('Failed to fetch pending doctors')
        setLoading(false)
      }
    }
    
    fetchPendingDoctors()
  }, [])

  const handleViewDetails = (doctor) => {
    setSelectedDoctor(doctor)
    setIsModalOpen(true)
  }

  const handleApprove = async (doctorId) => {
    try {
      const resutlt = await adminAxiosInstance.put('/doctors/toggle-accept')
      toast.success('Doctor approved successfully')
      setIsModalOpen(false)
    } catch (error) {
      toast.error('Failed to approve doctor')
    }
  }

  const handleReject = async (doctorId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      toast.success('Doctor rejected successfully')
      setIsModalOpen(false)
    } catch (error) {
      toast.error('Failed to reject doctor')
    }
  }

  const filteredDoctors = pendingDoctors.filter(doctor => {
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
            <h2 className="text-2xl font-bold">Pending Doctors</h2>
            <p className="text-gray-600">
              {filteredDoctors.length} {filteredDoctors.length === 1 ? 'doctor' : 'doctors'} waiting for approval
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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Specialty</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Phone</th>
                  <th className="text-left p-3">Experience</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingDoctors.length > 0 ? (
                  pendingDoctors.map(doctor => (
                    <tr key={doctor._id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{doctor.name}</td>
                      <td className="p-3">{doctor.specialty || "Dermatologist"}</td>
                      <td className="p-3 text-sm">{doctor.email}</td>
                      <td className="p-3 text-sm">{doctor.phone}</td>
                      <td className="p-3">{doctor.experience}</td>
                      <td className="p-3">
                        <button
                          onClick={() => handleViewDetails(doctor)}
                          className="flex items-center px-3 py-1 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200"
                        >
                          <FiEye className="mr-1" />
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-500">
                      No pending doctors found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Doctor Details Modal */}
        {isModalOpen && selectedDoctor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{selectedDoctor.name}</h3>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiX size={24} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Professional Information</h4>
                    <div className="space-y-2">
                      {/* <p><span className="text-gray-600">Specialty:</span> {selectedDoctor.specialty}</p> */}
                      <p><span className="text-gray-600">Experience:</span> {selectedDoctor.experince}</p>
                      {/* <p><span className="text-gray-600">Education:</span> {selectedDoctor.education}</p> */}
                      <p><span className="text-gray-600">License:</span> {selectedDoctor.licenseNumber}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Contact Information</h4>
                    <div className="space-y-2">
                      <p><span className="text-gray-600">Email:</span> {selectedDoctor.email}</p>
                      <p><span className="text-gray-600">Phone:</span> {selectedDoctor.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-2">Documents</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {/* {selectedDoctor.documents.map((doc, index) => (
                      <li key={index}>{doc}</li>
                    ))} */}
                  </ul>
                </div>
                
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => handleReject(selectedDoctor.id)}
                    className="flex items-center px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                  >
                    <FiX className="mr-2" />
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(selectedDoctor._id)}
                    className="flex items-center px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                  >
                    <FiCheck className="mr-2" />
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PendingDoctorsPage