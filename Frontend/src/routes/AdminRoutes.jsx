import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserManagement from "../pages/admin/UserManagement";
import AppointmentManagement from "../pages/admin/AppoimentManagement";
import DoctorsPage from "../pages/admin/DoctorPage";
import PendingDoctorsPage from "../pages/admin/PendingDoctors";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route index element={<AdminDashboard/>} />
      <Route path="users" element={<UserManagement/>} />
      <Route path="appointments" element={<AppointmentManagement />} />
      <Route path="doctors" element={<DoctorsPage />} />
      <Route path="pending-doctors" element={<PendingDoctorsPage />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default AdminRoutes;