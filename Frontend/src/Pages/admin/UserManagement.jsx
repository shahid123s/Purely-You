import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import Pagination from '../../components/Pagination'
import { 
  FiEdit2, 
  FiLock, 
  FiSearch, 
  FiTrash2, 
  FiUnlock, 
} from 'react-icons/fi'
import UserModal from '../../components/user/UserModal'
import RoleFilter from '../../components/user/RoleFilter'
import StatusFilter from '../../components/user/StatusFilter'
import AdminSidebar from '../../components/admin/AdminSidebar'

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const usersPerPage = 10

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const firstNames = ['John', 'Sarah', 'Michael', 'Emily', 'David', 'Jessica', 'Robert', 'Jennifer']
        const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson']
        const specialties = ['Cardiology', 'Pediatrics', 'Dermatology', 'Neurology', 'Orthopedics']
        
        const dummyUsers = Array.from({ length: 45 }, (_, i) => {
          const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
          const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
          const role = i % 5 === 0 ? 'admin' : i % 3 === 0 ? 'doctor' : 'patient'
          
          return {
            id: i + 1,
            name: `${firstName} ${lastName}`,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
            role,
            specialty: role === 'doctor' ? specialties[Math.floor(Math.random() * specialties.length)] : null,
            status: i % 7 === 0 ? 'blocked' : 'active',
            lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleString(),
            phone: `(${Math.floor(100 + Math.random() * 900)}) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
            joinedDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString()
          }
        })
        
        setUsers(dummyUsers)
        setLoading(false)
      } catch (error) {
        toast.error('Failed to fetch users')
        setLoading(false)
      }
    }
    
    fetchUsers()
  }, [])

  const handleBlock = async (userId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' } 
          : user
      ))
      toast.success(`User ${users.find(u => u.id === userId).status === 'active' ? 'blocked' : 'unblocked'} successfully`)
    } catch (error) {
      toast.error('Operation failed')
    }
  }

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        setUsers(users.filter(user => user.id !== userId))
        toast.success('User deleted successfully')
      } catch (error) {
        toast.error('Failed to delete user')
      }
    }
  }

  const handleEdit = (user) => {
    setCurrentUser(user)
    setIsModalOpen(true)
  }

  const handleSaveUser = (userData) => {
    if (userData.id) {
      setUsers(users.map(user => 
        user.id === userData.id ? { ...user, ...userData } : user
      ))
      toast.success('User updated successfully')
    } else {
      const newUser = {
        ...userData,
        id: Math.max(...users.map(u => u.id)) + 1,
        status: 'active',
        lastLogin: new Date().toLocaleString(),
        joinedDate: new Date().toLocaleDateString()
      }
      setUsers([...users, newUser])
      toast.success('User added successfully')
    }
    setIsModalOpen(false)
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone && user.phone.includes(searchTerm))
    
    const matchesRole = selectedRole === 'all' || user.role === selectedRole
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <div className="md:ml-64 p-4 md:p-6">
      <AdminSidebar/>
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold">User Management</h2>
            <p className="text-gray-600">
              {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} found
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 border rounded-lg w-full"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            
            <div className="flex gap-2">
              <RoleFilter 
                selectedRole={selectedRole}
                onRoleChange={(role) => {
                  setSelectedRole(role)
                  setCurrentPage(1)
                }}
              />
              
              <StatusFilter
                selectedStatus={selectedStatus}
                onStatusChange={(status) => {
                  setSelectedStatus(status)
                  setCurrentPage(1)
                }}
              />
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
                    <th className="text-left p-3">Name</th>
                    <th className="text-left p-3">Email</th>
                    <th className="text-left p-3">Phone</th>
                    <th className="text-left p-3">Role</th>
                    <th className="text-left p-3">Specialty</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Last Login</th>
                    <th className="text-left p-3">Joined Date</th>
                    <th className="text-left p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.length > 0 ? (
                    currentUsers.map(user => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{user.name}</td>
                        <td className="p-3 text-sm">{user.email}</td>
                        <td className="p-3 text-sm">{user.phone}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                            user.role === 'doctor' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-3 text-sm">
                          {user.specialty || '-'}
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="p-3 text-sm text-gray-600">{user.lastLogin}</td>
                        <td className="p-3 text-sm text-gray-600">{user.joinedDate}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleBlock(user.id)}
                              className={`p-2 rounded-lg ${
                                user.status === 'active' 
                                  ? 'text-red-600 bg-red-50 hover:bg-red-100' 
                                  : 'text-green-600 bg-green-50 hover:bg-green-100'
                              }`}
                              title={user.status === 'active' ? 'Block user' : 'Unblock user'}
                            >
                              {user.status === 'active' ? <FiLock /> : <FiUnlock />}
                            </button>
                            <button 
                              onClick={() => handleEdit(user)}
                              className="p-2 text-yellow-600 bg-yellow-50 rounded-lg hover:bg-yellow-100" 
                              title="Edit"
                            >
                              <FiEdit2 />
                            </button>
                            <button 
                              onClick={() => handleDelete(user.id)}
                              className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100" 
                              title="Delete"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="p-4 text-center text-gray-500">
                        No users found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <Pagination
              itemsPerPage={usersPerPage}
              totalItems={filteredUsers.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </>
        )}

        <UserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={currentUser}
          onSave={handleSaveUser}
        />
      </div>
    </div>
  )
}

export default UserManagement