// AdminRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";
import UserManagement from "../pages/admin/UserManagement";
import AdminDashboard from "../pages/admin/AdminDashboard";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
};

export default AdminRoutes;