import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
//import { getUserRole } from "../Utils/roles";

const AdminProtectedRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setAuthorized(false);
        return;
      }

      try {
        const res = await fetch("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAuthorized(res.data.role === "admin");
      } catch (err) {
        console.error("❌ Auth error:", err);
        setAuthorized(false);
      }
    };

    verifyAdmin();
  }, []);

  if (authorized === null) return <div>Sprawdzanie uprawnień...</div>;

  if (!authorized) return <Navigate to="/" />;

  return children;
};

export default AdminProtectedRoute;
