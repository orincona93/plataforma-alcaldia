import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";

function Sidebar() {
  const [open, setOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState({});
  const { user, logout } = useAuth();

  const toggleMenu = (index) => {
    setOpenMenus({
      ...openMenus,
      [index]: !openMenus[index]
    });
  };

  const menu = [
    {
      nombre: "Dashboard",
      ruta: "/",
      roles: ["admin", "usuario", "consulta"]
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
    },
    {
      nombre: "Convenios",
      roles: ["admin"],
      submenus: [
        { nombre: "Listado", ruta: "/convenios" },
        { nombre: "Dashboard", ruta: "/convenios-dashboard" }
      ]
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

            if (!user || !item.roles.includes(user.rol)) return null;

            return (
              <div key={index} style={{ marginBottom: "10px" }}>

                {/* TITULO */}
                <div
                  onClick={() => item.submenus && toggleMenu(index)}
                  style={{
                    cursor: item.submenus ? "pointer" : "default",
                    padding: "8px",
                    fontWeight: "bold",
                    background: "rgba(0,0,0,0.1)",
                    borderRadius: "5px"
                  }}
                >
                  {open ? item.nombre : "•"}
                </div>

                {/* LINK DIRECTO */}
                {item.ruta && (
                  <Link to={item.ruta} style={linkStyle}>
                    {open ? "• " + item.nombre : "•"}
                  </Link>
                )}

                {/* SUBMENUS */}
                {item.submenus && openMenus[index] && (
                  <div style={{ marginLeft: "10px" }}>
                    {item.submenus.map((sub, i) => (
                      <Link key={i} to={sub.ruta} style={linkStyle}>
                        {open ? "→ " + sub.nombre : "•"}
                      </Link>
                    ))}
                  </div>
                )}

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