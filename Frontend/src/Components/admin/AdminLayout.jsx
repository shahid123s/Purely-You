// AdminLayout.jsx
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import AdminSidebar from '../../components/admin/AdminSidebar'

export default function AdminLayout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    toast.success('Logged out successfully')
    navigate('/admin/login')
  }

//   useEffect(() => {
//     if (!localStorage.getItem('adminToken')) {
//       navigate('/admin/login')
//     }
//   }, [navigate])

  return (
    <div className="flex h-screen">
      <AdminSidebar handleLogout={handleLogout} />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}