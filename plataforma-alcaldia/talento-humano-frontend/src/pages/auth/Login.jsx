import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
  e.preventDefault();

  // Simulación más real
  if (form.username === "admin") {
    login({
      username: "admin",
      rol: "admin",
      nombre: "Administrador",
      permisos: ["todo"]
    });
  } else if (form.username === "talento") {
    login({
      username: "talento",
      rol: "talento",
      nombre: "Gestión Humana"
    });
  } else {
    login({
      username: form.username,
      rol: "consulta",
      nombre: "Invitado"
    });
  }

  navigate("/");
};

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input name="username" placeholder="Usuario" onChange={(e)=>setForm({...form, username:e.target.value})}/>
        <input name="password" type="password" placeholder="Contraseña" onChange={(e)=>setForm({...form, password:e.target.value})}/>

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default Login;