import { useAuth } from "../context/AuthContext";

function Header() {
  const { user } = useAuth();

  return (
    <div style={{
      height: "60px",
      background: "#FFFFFF",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      borderBottom: "2px solid #C8102E"
    }}>
      <h3 style={{ color: "#C8102E" }}>Sistema Administrativo</h3>

      <div>
        👤 {user?.nombre} ({user?.rol})
      </div>
    </div>
  );
}

export default Header;