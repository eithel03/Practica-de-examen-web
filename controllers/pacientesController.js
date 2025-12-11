const db = require("../config/db");

// Crear paciente
exports.crearPaciente = (req, res) => {
  const { nombre, edad, direccion } = req.body;

  const sql = "INSERT INTO pacientes (nombre, edad, direccion, activo) VALUES (?, ?, ?, 1)";
  db.query(sql, [nombre, edad, direccion], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Paciente registrado", id: result.insertId });
  });
};

// Listar pacientes activos
exports.obtenerPacientes = (req, res) => {
  const sql = "SELECT * FROM pacientes WHERE activo = 1";
  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
};

// Buscar por ID
exports.obtenerPacientePorId = (req, res) => {
  const { id } = req.params;
  
  const sql = "SELECT * FROM pacientes WHERE id = ? AND activo = 1";
  db.query(sql, [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    if (rows.length === 0) return res.status(404).json({ message: "Paciente no encontrado" });
    res.json(rows[0]);
  });
};

// Actualizar
exports.actualizarPaciente = (req, res) => {
  const { id } = req.params;
  const { nombre, edad, direccion } = req.body;

  const sql = "UPDATE pacientes SET nombre = ?, edad = ?, direccion = ? WHERE id = ?";
  db.query(sql, [nombre, edad, direccion, id], err => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Paciente actualizado" });
  });
};

// Borrado lógico
exports.eliminarPaciente = (req, res) => {
  const { id } = req.params;

  const sql = "UPDATE pacientes SET activo = 0 WHERE id = ?";
  db.query(sql, [id], err => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Paciente eliminado" });
  });
};
