import { useState, useEffect } from "react";
import { getEmpleados, createEmpleado } from "../../services/empleadosService";

function Empleados() {
  const [empleados, setEmpleados] = useState([]);

  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    numeroDocumento: "",
    tipoFuncionario: ""
  });

  // 🔹 Cargar empleados al iniciar
  useEffect(() => {
    getEmpleados()
      .then(res => setEmpleados(res.data))
      .catch(err => console.error(err));
  }, []);

  // 🔹 Manejar cambios
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 Guardar empleado
  const handleSubmit = (e) => {
    e.preventDefault();

    createEmpleado(form)
      .then(res => {
        setEmpleados([...empleados, res.data]);
        setForm({
          nombres: "",
          apellidos: "",
          numeroDocumento: "",
          tipoFuncionario: ""
        });
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Gestión de Empleados</h1>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit}>
        <input
          name="nombres"
          placeholder="Nombres"
          value={form.nombres}
          onChange={handleChange}
        />

        <input
          name="apellidos"
          placeholder="Apellidos"
          value={form.apellidos}
          onChange={handleChange}
        />

        <input
          name="numeroDocumento"
          placeholder="Documento"
          value={form.numeroDocumento}
          onChange={handleChange}
        />

        <select
          name="tipoFuncionario"
          value={form.tipoFuncionario}
          onChange={handleChange}
        >
          <option value="">Tipo</option>
          <option value="contratista">Contratista</option>
          <option value="carrera">Carrera</option>
          <option value="directivo">Directivo</option>
        </select>

        <button type="submit">Guardar</button>
      </form>

      {/* TABLA */}
      <table border="1" width="100%" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Documento</th>
            <th>Tipo</th>
          </tr>
        </thead>

        <tbody>
          {empleados.map(emp => (
            <tr key={emp.id}>
              <td>{emp.nombres} {emp.apellidos}</td>
              <td>{emp.numeroDocumento}</td>
              <td>{emp.tipoFuncionario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Empleados;