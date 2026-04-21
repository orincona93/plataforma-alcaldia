function EmpleadoCard({ empleado }) {
  return (
    <div style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
      <h3>{empleado.nombres} {empleado.apellidos}</h3>
      <p>{empleado.email}</p>
    </div>
  );
}

export default EmpleadoCard;
