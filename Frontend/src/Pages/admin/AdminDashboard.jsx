import { useState, useEffect } from 'react'
import { FiUsers, FiCalendar, FiActivity, FiDownload } from 'react-icons/fi'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import AdminSidebar from '../../components/admin/AdminSidebar'

const AdminDashboard = () => {
  const [reportType, setReportType] = useState('users')
  const [timeRange, setTimeRange] = useState('month')
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({})
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        let dummyStats = {}
        let dummyChartData = []
        
        if (reportType === 'users') {
          dummyStats = {
            total: 1245,
            new: 42,
            active: 987,
            blocked: 58
          }
          
          dummyChartData = Array.from({ length: timeRange === 'month' ? 12 : 7 }, (_, i) => ({
            name: timeRange === 'month' ? 
              new Date(2023, i).toLocaleString('default', { month: 'short' }) : 
              ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i],
            newUsers: Math.floor(Math.random() * 50) + 10,
            activeUsers: Math.floor(Math.random() * 200) + 50
          }))
        } else if (reportType === 'appointments') {
          dummyStats = {
            total: 876,
            completed: 654,
            cancelled: 98,
            pending: 124
          }
          
          dummyChartData = Array.from({ length: timeRange === 'month' ? 12 : 7 }, (_, i) => ({
            name: timeRange === 'month' ? 
              new Date(2023, i).toLocaleString('default', { month: 'short' }) : 
              ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i],
            scheduled: Math.floor(Math.random() * 100) + 20,
            completed: Math.floor(Math.random() * 80) + 15,
            cancelled: Math.floor(Math.random() * 15) + 2
          }))
        } else {
          dummyStats = {
            revenue: 125600,
            expenses: 78600,
            profit: 47000,
            growth: 12.5
          }
          
          dummyChartData = Array.from({ length: timeRange === 'month' ? 12 : 7 }, (_, i) => ({
            name: timeRange === 'month' ? 
              new Date(2023, i).toLocaleString('default', { month: 'short' }) : 
              ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i],
            revenue: Math.floor(Math.random() * 20000) + 5000,
            expenses: Math.floor(Math.random() * 12000) + 3000,
            profit: Math.floor(Math.random() * 8000) + 2000
          }))
        }
        
        setStats(dummyStats)
        setChartData(dummyChartData)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [reportType, timeRange])

  const handleDownload = () => {
    alert(`Downloading ${reportType} report for ${timeRange}`)
  }

  return (
    <div className="md:ml-64 p-4 md:p-6">
      <AdminSidebar/>
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-2xl font-bold">Reports</h2>
          <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
            <select
              className="px-4 py-2 border rounded-lg bg-white"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="users">User Reports</option>
              <option value="appointments">Appointment Reports</option>
              <option value="financial">Financial Reports</option>
            </select>
            <select
              className="px-4 py-2 border rounded-lg bg-white"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="month">Monthly</option>
              <option value="week">Weekly</option>
            </select>
            <button 
              onClick={handleDownload}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <FiDownload className="mr-2" />
              Export
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {Object.entries(stats).map(([key, value]) => (
                <div key={key} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 capitalize">{key}</h3>
                      <p className="text-2xl font-bold">
                        {typeof value === 'number' && key !== 'growth' ? 
                          value.toLocaleString() : 
                          typeof value === 'number' ? 
                          `${value}%` : 
                          value}
                      </p>
                    </div>
                    <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                      {reportType === 'users' ? <FiUsers /> : 
                       reportType === 'appointments' ? <FiCalendar /> : 
                       <FiActivity />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {reportType === 'users' ? (
                    <>
                      <Bar dataKey="newUsers" fill="#8884d8" name="New Users" />
                      <Bar dataKey="activeUsers" fill="#82ca9d" name="Active Users" />
                    </>
                  ) : reportType === 'appointments' ? (
                    <>
                      <Bar dataKey="scheduled" fill="#8884d8" name="Scheduled" />
                      <Bar dataKey="completed" fill="#82ca9d" name="Completed" />
                      <Bar dataKey="cancelled" fill="#ff8042" name="Cancelled" />
                    </>
                  ) : (
                    <>
                      <Bar dataKey="revenue" fill="#8884d8" name="Revenue ($)" />
                      <Bar dataKey="expenses" fill="#ff8042" name="Expenses ($)" />
                      <Bar dataKey="profit" fill="#82ca9d" name="Profit ($)" />
                    </>
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard