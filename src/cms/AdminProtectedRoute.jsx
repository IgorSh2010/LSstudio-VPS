import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMe } from "../api/user";

const AdminProtectedRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const res = await getMe();

        if (res.status === 401) {
          setAuthorized(false);
          return;
        }

        setAuthorized(res.user.role === "admin");
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
