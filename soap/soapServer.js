const fs = require("fs");
const path = require("path");
const soap = require("soap");
const db = require("../config/db");  // <-- NECESARIO para consultar MySQL

// Cargar el WSDL
const wsdlXml = fs.readFileSync(path.join(__dirname, "service.wsdl"), "utf8");

// Objeto del servicio SOAP
const serviceObject = {
  DataCareService: {
    DataCarePort: {

      // ------------------------------------
      // OPERACIÓN 1: hola
      // ------------------------------------
      hola(args) {
        const nombre = args?.nombre || "mundo";
        return { saludo: `Hola ${nombre}` };
      },

      // ------------------------------------
      // OPERACIÓN 2: sumar
      // ------------------------------------
      sumar(args) {
        const a = parseInt(args?.a || 0, 10);
        const b = parseInt(args?.b || 0, 10);
        return { resultado: a + b };
      },

      // ------------------------------------
      // OPERACIÓN 3: getPaciente (NUEVO)
      // ------------------------------------
      async getPaciente(args) {
        const id = args?.id;

        return new Promise((resolve, reject) => {
          const sql = "SELECT * FROM pacientes WHERE id = ?";
          db.query(sql, [id], (err, rows) => {
            if (err) {
              console.error("Error DB:", err);
              return resolve({
                id: 0,
                nombre: "ERROR",
                edad: 0,
                direccion: "DB error"
              });
            }

            if (rows.length === 0) {
              return resolve({
                id: 0,
                nombre: "No existe",
                edad: 0,
                direccion: "N/A"
              });
            }

            const p = rows[0];

            resolve({
              id: p.id,
              nombre: p.nombre,
              edad: p.edad,
              direccion: p.direccion
            });
          });
        });
      }

    }
  }
};

// Setup para app.js
function setupSoap(server) {
  soap.listen(server, "/soap", serviceObject, wsdlXml);
  console.log("SOAP escuchando en http://localhost:3000/soap?wsdl");

  return { wsdlXml, serviceObject };
}

module.exports = { setupSoap, serviceObject, wsdlXml };
