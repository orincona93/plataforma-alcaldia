console.log("🔥 SERVER NUEVO ACTIVO 🔥");
const express = require("express");
const cors = require("cors");
const db = require("./db");

// 🔥 IMPORTS ARRIBA
const multer = require("multer");
const xlsx = require("xlsx");

const app = express();

app.use(cors());
app.use(express.json());

// 📁 configuración subida archivos
const upload = multer({ dest: "uploads/" });

/* =========================
   TEST DB
========================= */
app.get("/test-db", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

/* =========================
   EMPLEADOS
========================= */
app.get("/empleados", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM empleados");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/empleados", async (req, res) => {
  const e = req.body;

  try {
    const result = await db.query(
      `INSERT INTO empleados 
      (nombres, apellidos, numero_documento, tipo_funcionario)
      VALUES ($1,$2,$3,$4)
      RETURNING *`,
      [e.nombres, e.apellidos, e.numeroDocumento, e.tipoFuncionario]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* =========================
   PERMISOS
========================= */
app.get("/permisos", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM permisos");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/permisos", async (req, res) => {
  const p = req.body;

  try {
    const result = await db.query(
      `INSERT INTO permisos
      (empleado_id, tipo_permiso, fecha_inicio, fecha_fin, motivo)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *`,
      [
        p.empleadoId,
        p.tipoPermiso,
        p.fechaInicio,
        p.fechaFin,
        p.motivo
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* =========================
   CONVENIOS
========================= */

// 🔹 DASHBOARD
app.get("/dashboard/convenios", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM convenios");
    const data = result.rows;

    let total = data.length;
    let activos = 0;
    let proximos = 0;
    let vencidos = 0;

    const hoy = new Date();

    data.forEach(c => {
      const fin = new Date(c.fecha_fin);
      const diff = (fin - hoy) / (1000 * 60 * 60 * 24);

      if (diff < 0) vencidos++;
      else if (diff <= 30) proximos++;
      else activos++;
    });

    res.json({ total, activos, proximos, vencidos, data });

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// 🔹 LISTAR
app.get("/convenios", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM convenios");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 🔹 CREAR
app.post("/convenios", async (req, res) => {
  const c = req.body;

  try {
    const result = await db.query(
      `INSERT INTO convenios
      (tipo, nombre, entidad, objeto, valor, fecha_inicio, fecha_fin, estado,
       supervisor, dependencia, numero_contrato, observaciones)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      RETURNING *`,
      [
        c.tipo,
        c.nombre,
        c.entidad,
        c.objeto,
        c.valor,
        c.fecha_inicio,
        c.fecha_fin,
        c.estado,
        c.supervisor,
        c.dependencia,
        c.numero_contrato,
        c.observaciones
      ]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

/* =========================
   IMPORTAR EXCEL
========================= */
app.post("/importar-excel", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se subió archivo" });
    }

    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    for (let row of data) {
      await db.query(
        `INSERT INTO convenios 
        (nombre, entidad, valor, fecha_inicio, fecha_fin, tipo)
        VALUES ($1,$2,$3,$4,$5,$6)`,
        [
          row.nombre || "",
          row.entidad || "",
          row.valor || 0,
          row.fecha_inicio || null,
          row.fecha_fin || null,
          row.tipo || ""
        ]
      );
    }

    res.json({ mensaje: "✅ Excel importado correctamente" });

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

/* =========================
   SERVIDOR
========================= */
app.listen(3002, () => {
  console.log("🚀 Backend corriendo en http://localhost:3002");
});