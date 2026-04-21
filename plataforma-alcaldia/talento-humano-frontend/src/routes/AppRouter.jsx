import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Empleados from "../pages/empleados/Empleados";
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";
import Permisos from "../pages/permisos/Permisos";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute roles={["admin", "usuario"]}>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/empleados"
          element={
            <PrivateRoute roles={["admin"]}>
              <MainLayout>
                <Empleados />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
        path="/permisos"
        element={
            <PrivateRoute roles={["admin", "talento"]}>
            <MainLayout>
                <Permisos />
            </MainLayout>
            </PrivateRoute>
        }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;