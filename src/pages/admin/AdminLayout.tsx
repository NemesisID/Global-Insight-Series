import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/control");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  );
};
