import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

function ConveniosDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3002/dashboard/convenios")
      .then(res => setData(res.data));
  }, []);

  if (!data) return <p>Cargando...</p>;

  const chartData = [
    { name: "Activos", value: data.activos },
    { name: "Próximos", value: data.proximos },
    { name: "Vencidos", value: data.vencidos }
  ];

  return (
    <div style={{ padding: "20px" }}>

      <h1>📊 Dashboard Convenios</h1>

      {/* KPIs */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <Card title="Total" value={data.total} color="#1e3a8a" />
        <Card title="Activos" value={data.activos} color="#16a34a" />
        <Card title="Próximos" value={data.proximos} color="#f59e0b" />
        <Card title="Vencidos" value={data.vencidos} color="#dc2626" />
      </div>

      {/* Gráfica */}
      <PieChart width={400} height={300}>
        <Pie data={chartData} dataKey="value">
          <Cell fill="#16a34a" />
          <Cell fill="#f59e0b" />
          <Cell fill="#dc2626" />
        </Pie>
        <Tooltip />
      </PieChart>

      {/* ALERTAS GRANDES */}
      <h2>🚨 Alertas</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Alerta color="red" texto={`Vencidos: ${data.vencidos}`} />
        <Alerta color="orange" texto={`Próximos: ${data.proximos}`} />
        <Alerta color="green" texto={`Activos: ${data.activos}`} />
      </div>

    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div style={{
      background: color,
      color: "white",
      padding: "20px",
      borderRadius: "10px",
      width: "150px"
    }}>
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  );
}

function Alerta({ color, texto }) {
  return (
    <div style={{
      background: color,
      color: "white",
      padding: "20px",
      borderRadius: "10px",
      fontWeight: "bold"
    }}>
      {texto}
    </div>
  );
}

export default ConveniosDashboard;