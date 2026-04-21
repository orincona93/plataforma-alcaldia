const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let empleados = [];

// GET
app.get("/empleados", (req, res) => {
  res.json(empleados);
});

// POST
app.post("/empleados", (req, res) => {
  const nuevo = { id: Date.now(), ...req.body };
  empleados.push(nuevo);
  res.json(nuevo);
});

app.listen(3001, () => {
  console.log("Backend corriendo en http://localhost:3001");
});
let permisos = [];

// GET permisos
app.get("/permisos", (req, res) => {
  res.json(permisos);
});

// POST permisos
app.post("/permisos", (req, res) => {
  const nuevo = { id: Date.now(), ...req.body };
  permisos.push(nuevo);
  res.json(nuevo);
});