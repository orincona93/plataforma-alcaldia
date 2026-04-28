import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    usuario: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (form.usuario === "admin") {
      login({ nombre: "Admin", rol: "admin" });
      navigate("/");
    } else {
      alert("Usuario inválido");
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input name="usuario" placeholder="Usuario" onChange={handleChange} />
        <br />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
        <br />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default Login;