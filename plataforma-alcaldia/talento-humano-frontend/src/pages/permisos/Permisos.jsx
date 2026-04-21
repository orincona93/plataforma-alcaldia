import { useState, useEffect } from "react";
import { getPermisos, createPermiso } from "../../services/permisosService";
import { getEmpleados } from "../../services/empleadosService";

function Permisos() {
  const [permisos, setPermisos] = useState([]);
  const [empleados, setEmpleados] = useState([]);

  const [form, setForm] = useState({
    empleadoId: "",
    tipoPermiso: "",
    fechaInicio: "",
    fechaFin: "",
    motivo: "",
    archivo: null
  });

  useEffect(() => {
    getPermisos().then(res => setPermisos(res.data));
    getEmpleados().then(res => setEmpleados(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "archivo") {
      setForm({ ...form, archivo: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...form,
      archivo: form.archivo ? form.archivo.name : null
    };

    createPermiso(data).then(res => {
      setPermisos([...permisos, res.data]);
    });
  };

  return (
    <div>
      <h1>Gestión de Permisos</h1>

      {/* DESCARGAR PLANTILLA */}
      <a href="/plantilla-permiso.xlsx" download>
        Descargar plantilla Excel
      </a>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        
        <select name="empleadoId" onChange={handleChange}>
          <option value="">Seleccione funcionario</option>
          {empleados.map(emp => (
            <option key={emp.id} value={emp.id}>
              {emp.nombres} {emp.apellidos}
            </option>
          ))}
        </select>

        <select name="tipoPermiso" onChange={handleChange}>
          <option value="">Tipo de permiso</option>
          <option value="vacaciones">Vacaciones</option>
          <option value="calamidad">Calamidad</option>
          <option value="licencia">Licencia</option>
        </select>

        <input type="date" name="fechaInicio" onChange={handleChange} />
        <input type="date" name="fechaFin" onChange={handleChange} />

        <input name="motivo" placeholder="Motivo" onChange={handleChange} />

        <input type="file" name="archivo" accept="application/pdf" onChange={handleChange} />

        <button type="submit">Guardar Permiso</button>
      </form>

      {/* TABLA */}
      <table style={{ width: "100%", marginTop: "20px", background: "white" }}>
        <thead>
          <tr>
            <th>Funcionario</th>
            <th>Tipo</th>
            <th>Fechas</th>
            <th>Archivo</th>
          </tr>
        </thead>

        <tbody>
          {permisos.map(p => {
            const emp = empleados.find(e => e.id == p.empleadoId);

            return (
              <tr key={p.id}>
                <td>{emp ? emp.nombres : "N/A"}</td>
                <td>{p.tipoPermiso}</td>
                <td>{p.fechaInicio} - {p.fechaFin}</td>
                <td>{p.archivo}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Permisos;