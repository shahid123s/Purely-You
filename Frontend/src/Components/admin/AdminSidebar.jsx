import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiLogOut,
  FiMenu,
  FiX,
  FiUserPlus
} from 'react-icons/fi';

const AdminSidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsOpen(true);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const target = e.target;
      if (isMobile && isOpen && !target.closest('.sidebar')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobile, isOpen]);

  const navItems = [
    { path: '/admin', icon: FiHome, label: 'Dashboard' },
    { path: '/admin/users', icon: FiUsers, label: 'Users' },
    { path: '/admin/appointments', icon: FiCalendar, label: 'Appointments' },
    { path: '/admin/doctors', icon: FiUserPlus, label: 'Doctors' },
    { path: '/admin/pending-doctors', icon: FiUserPlus, label: 'Pending Doctors' },
  ];

  const isActive = (path) => {
    return location.pathname === path || 
      (path !== '/admin' && location.pathname.startsWith(path));
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 text-gray-600 hover:text-gray-800 bg-white rounded-lg shadow"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <aside
        className={`sidebar fixed inset-y-0 left-0 z-40 bg-white shadow-lg w-64 transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="mb-8 px-2 py-4">
            <h1 className="text-xl font-bold text-indigo-600">Admin Panel</h1>
          </div>

          <nav className="flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-3 rounded-lg mb-1 transition-colors
                    ${active 
                      ? 'bg-indigo-100 text-indigo-600 font-semibold' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'}`}
                  onClick={() => isMobile && setIsOpen(false)}
                >
                  <Icon className="mr-3" size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="mt-auto flex items-center px-3 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <FiLogOut className="mr-3" size={20} />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </aside>

      {isOpen && isMobile && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" />
      )}
    </>
  );
};

export default AdminSidebar;