import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Convenios() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3002/convenios")
      .then(res => {
        console.log("CONVENIOS:", res.data);
        setData(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const getSemaforo = (fechaFin) => {
    const hoy = new Date();
    const fin = new Date(fechaFin);
    const diff = (fin - hoy) / (1000 * 60 * 60 * 24);

    if (diff < 0) return "#dc2626"; // rojo
    if (diff <= 30) return "#f59e0b"; // amarillo
    return "#16a34a"; // verde
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📄 Gestión de Convenios</h1>

      {/* BOTÓN CORRECTO */}
      <button
        onClick={() => navigate("/crear-convenio")}
        style={{
          marginBottom: "10px",
          background: "#FFD100",
          border: "none",
          padding: "10px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        + Nuevo Convenio
      </button>

      {/* TABLA */}
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        background: "white",
        borderRadius: "10px"
      }}>
        <thead style={{ background: "#991b1b", color: "white" }}>
          <tr>
            <th>Nombre</th>
            <th>Entidad</th>
            <th>Valor</th>
            <th>Fecha Fin</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan="5">No hay convenios</td>
            </tr>
          )}

          {data.map(c => (
            <tr key={c.id}>
              <td>{c.nombre}</td>
              <td>{c.entidad}</td>
              <td>${c.valor}</td>
              <td>{c.fecha_fin}</td>
              <td>
                <span style={{
                  width: "15px",
                  height: "15px",
                  display: "inline-block",
                  borderRadius: "50%",
                  background: getSemaforo(c.fecha_fin)
                }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Convenios;