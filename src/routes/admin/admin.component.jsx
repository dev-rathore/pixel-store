import { Route, Routes } from "react-router-dom";
import AdminLogin from "../../components/admin-login/admin-login.component";
import AdminDashboard from "../../components/admin-dashboard/admin-dashboard.component";

const Admin = () => {
  return (
    <Routes>
      {/* Route = /admin */}
      <Route index element={<AdminLogin />} />
      {/* Route = /admin/dashboard */}
      <Route path="dashboard" element={<AdminDashboard />} />
    </Routes>
  );
};

export default Admin;
