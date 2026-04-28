import { useState } from "react";
import axios from "axios";

function CrearConvenio() {

  const [form, setForm] = useState({
    tipo: "",
    nombre: "",
    entidad: "",
    objeto: "",
    valor: "",
    fecha_inicio: "",
    fecha_fin: "",
    estado: "activo",
    supervisor: "",
    dependencia: "",
    numero_contrato: "",
    observaciones: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:3002/convenios", form);

    alert("Convenio guardado");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Crear Convenio</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px"
        }}
      >

        <select name="tipo" onChange={handleChange}>
          <option value="">Tipo</option>
          <option value="alcaldia">Alcaldía</option>
          <option value="secretaria">Secretaría</option>
          <option value="convenio">Convenio</option>
        </select>

        <input name="nombre" placeholder="Nombre" onChange={handleChange} />
        <input name="entidad" placeholder="Entidad" onChange={handleChange} />

        <input name="numero_contrato" placeholder="Número contrato" onChange={handleChange} />

        <input type="date" name="fecha_inicio" onChange={handleChange} />
        <input type="date" name="fecha_fin" onChange={handleChange} />

        <input name="valor" placeholder="Valor" onChange={handleChange} />

        <input name="supervisor" placeholder="Supervisor" onChange={handleChange} />
        <input name="dependencia" placeholder="Dependencia" onChange={handleChange} />

        <textarea name="objeto" placeholder="Objeto" onChange={handleChange} />

        <textarea name="observaciones" placeholder="Observaciones" onChange={handleChange} />

        <button type="submit">Guardar</button>

      </form>
    </div>
  );
}

export default CrearConvenio;