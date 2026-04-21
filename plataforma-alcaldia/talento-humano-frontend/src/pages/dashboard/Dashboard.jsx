import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

function Dashboard() {

  // 🔹 Datos simulados (luego los conectamos al backend)
  const data = [
    { nombre: "Contratistas", cantidad: 40 },
    { nombre: "Carrera", cantidad: 25 },
    { nombre: "Directivos", cantidad: 10 }
  ];

  const COLORS = ["#C8102E", "#FFD100", "#333"];

  return (
    <div>
      <h1>Dashboard</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        marginTop: "20px"
      }}>

        {/* 🔹 GRÁFICA DE BARRAS */}
        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px"
        }}>
          <h3>Empleados por tipo</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="nombre" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#C8102E" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 🔹 GRÁFICA CIRCULAR */}
        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px"
        }}>
          <h3>Distribución</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="cantidad"
                nameKey="nombre"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;