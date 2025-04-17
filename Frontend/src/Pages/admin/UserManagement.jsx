import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import Pagination from '../../components/Pagination'
import { 
  FiLock, 
  FiSearch, 
  FiUnlock, 
} from 'react-icons/fi'
import AdminSidebar from '../../components/admin/AdminSidebar'
import adminAxiosInstance from '../../utils/adminAxiosInstance'

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const usersPerPage = 10

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await adminAxiosInstance.get('/users');

        setUsers(response.data.data)
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

      const updatedUser = users.find(u => u.id === userId)
      toast.success(`User ${updatedUser?.status === 'active' ? 'blocked' : 'unblocked'} successfully`)
    } catch (error) {
      toast.error('Operation failed')
    }
  }

  const filteredUsers = users.filter(user => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone && user.phone.includes(searchTerm))
    )
  })

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <div className="md:ml-64 p-4 md:p-6">
      <AdminSidebar />
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold">User Management</h2>
            <p className="text-gray-600">
              {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} found
            </p>
          </div>

          <div className="relative flex-grow md:w-64">
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
                    <th className="text-left p-3">Status</th>
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
                          <span className={`px-2 py-1 rounded-full text-xs ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => handleBlock(user.id)}
                            className={`p-2 rounded-lg ${user.status === 'active' ? 'text-red-600 bg-red-50 hover:bg-red-100' : 'text-green-600 bg-green-50 hover:bg-green-100'}`}
                            title={user.status === 'active' ? 'Block user' : 'Unblock user'}
                          >
                            {user.status === 'active' ? <FiLock /> : <FiUnlock />}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-4 text-center text-gray-500">
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
      </div>
    </div>
  )
}

export default UserManagement
