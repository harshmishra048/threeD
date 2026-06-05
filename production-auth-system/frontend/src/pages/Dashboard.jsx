import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LogOut, ShieldCheck, UserCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
            alignItems: "center",
            marginBottom: "26px",
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: "30px" }}>Dashboard</h1>
            <p style={{ margin: "8px 0 0", color: "#64748b" }}>
              You are logged in successfully.
            </p>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={16} style={{ verticalAlign: "middle" }} /> Logout
          </button>
        </div>

        <div
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "18px",
            padding: "20px",
            marginBottom: "18px",
            background: "#f8fafc",
          }}
        >
          <UserCircle size={48} color="#2563eb" />

          <h2 style={{ marginBottom: "8px" }}>{user?.fullName || "User"}</h2>

          <p style={{ margin: "6px 0", color: "#475569" }}>
            <strong>Email:</strong> {user?.email}
          </p>

          <p style={{ margin: "6px 0", color: "#475569" }}>
            <strong>Role:</strong> {user?.role}
          </p>

          <p style={{ margin: "6px 0", color: "#475569" }}>
            <strong>Auth Provider:</strong> {user?.authProvider}
          </p>

          <p style={{ margin: "6px 0", color: "#475569" }}>
            <strong>Email Verified:</strong>{" "}
            {user?.isEmailVerified ? "Yes" : "No"}
          </p>
        </div>

        <div
          style={{
            border: "1px solid #bbf7d0",
            background: "#f0fdf4",
            borderRadius: "18px",
            padding: "18px",
            display: "flex",
            gap: "12px",
            alignItems: "flex-start",
          }}
        >
          <ShieldCheck size={28} color="#16a34a" />
          <div>
            <h3 style={{ margin: "0 0 6px" }}>Protected Route Working</h3>
            <p style={{ margin: 0, color: "#166534", lineHeight: 1.6 }}>
              This page can only be opened after login. Your access token and
              refresh token flow are connected with the frontend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
