const express = require("express");
const router = express.Router();
const pacienteController = require("../controllers/pacientesController");
const { authenticate, authorizeRole } = require("../middleware/auth");

// Crear paciente
router.post("/", authenticate, pacienteController.crearPaciente);

// Listar pacientes
router.get("/", authenticate, pacienteController.obtenerPacientes);

// Obtener por ID
router.get("/:id", authenticate, pacienteController.obtenerPacientePorId);

// Actualizar
router.put("/:id", authenticate, pacienteController.actualizarPaciente);

// Eliminar (solo admin)
router.delete("/:id", authenticate, authorizeRole("admin"), pacienteController.eliminarPaciente);

module.exports = router;
