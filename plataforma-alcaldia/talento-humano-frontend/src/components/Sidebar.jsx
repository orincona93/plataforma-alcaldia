import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const [open, setOpen] = useState(true);
  const { user, logout } = useAuth();

  const menu = [
    {
      nombre: "Dashboard",
      ruta: "/",
      roles: ["admin", "usuario"]
    },
    {
      nombre: "Talento Humano",
      roles: ["admin"],
      submenus: [
        { nombre: "Empleados", ruta: "/empleados" }
      ]
    },
    {
    nombre: "Permisos",
    roles: ["admin", "talento"],
    ruta: "/permisos"
    }
  ];

  return (
    <div style={{
      width: open ? "240px" : "70px",
      background: "#C8102E",
      color: "white",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }}>

      {/* TOP */}
      <div>
        <div style={{
          padding: "15px",
          fontWeight: "bold",
          borderBottom: "1px solid rgba(255,255,255,0.2)"
        }}>
          {open ? "Alcaldía Bogotá" : "AB"}
        </div>

        <button
          onClick={() => setOpen(!open)}
          style={{
            width: "100%",
            padding: "10px",
            background: "transparent",
            border: "none",
            color: "white",
            cursor: "pointer"
          }}
        >
          ☰
        </button>

        <div style={{ padding: "10px" }}>
          {menu.map((item, index) => {
            if (!item.roles.includes(user?.rol)) return null;

            return (
              <div key={index} style={{ marginBottom: "10px" }}>
                
                {open && (
                  <p style={{
                    fontSize: "12px",
                    opacity: 0.7,
                    marginBottom: "5px"
                  }}>
                    {item.nombre}
                  </p>
                )}

                {item.ruta && (
                  <Link to={item.ruta} style={linkStyle}>
                    {open ? item.nombre : "•"}
                  </Link>
                )}

                {item.submenus &&
                  item.submenus.map((sub, i) => (
                    <Link key={i} to={sub.ruta} style={linkStyle}>
                      {open ? "• " + sub.nombre : "•"}
                    </Link>
                  ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM */}
      <div style={{ padding: "10px" }}>
        <button
          onClick={logout}
          style={{
            width: "100%",
            background: "#FFD100",
            border: "none",
            padding: "10px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Salir
        </button>
      </div>
    </div>
  );
}

const linkStyle = {
  display: "block",
  color: "white",
  textDecoration: "none",
  padding: "8px",
  borderRadius: "5px",
  marginBottom: "5px"
};

export default Sidebar;