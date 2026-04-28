import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import PrivateRoute from "./components/PrivateRoute";

// Páginas
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Empleados from "./pages/empleados/Empleados";
import Permisos from "./pages/permisos/Permisos";
import Convenios from "./pages/convenios/Convenios";
import ConveniosDashboard from "./pages/dashboard/ConveniosDashboard";
import CrearConvenio from "./pages/convenios/CrearConvenio";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* 🔐 LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* 🔒 RUTAS PRIVADAS */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

/* =========================
   LAYOUT (SIDEBAR + CONTENIDO)
========================= */
function Layout() {
  return (
    <div style={{ display: "flex" }}>

      <Sidebar />

      <div style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/permisos" element={<Permisos />} />
          <Route path="/convenios" element={<Convenios />} />
          <Route path="/convenios-dashboard" element={<ConveniosDashboard />} />
          <Route path="/crear-convenio" element={<CrearConvenio />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;