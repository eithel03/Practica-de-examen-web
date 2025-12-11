require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const logger = require('./middleware/logger');
const limiter = require('./middleware/rateLimit');
const authRoutes = require('./routes/auth');
const pacientesRoutes = require('./routes/pacientes');
const { setupSoap } = require('./soap/soapServer'); // ← solo esto

const app = express();
app.use(express.json());
app.use(cors());
app.use(logger);

// Rate limit
app.use('/api/', limiter);

app.use('/api/auth', authRoutes);
app.use('/api/pacientes', pacientesRoutes);

// HTTP server
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

// MONTAR SOAP (SOLO UNA VEZ)
setupSoap(server);   // ← ESTA ES LA ÚNICA LLAMADA

// Endpoint simple
app.get('/', (req, res) => res.send('DataCare API corriendo'));

// Arrancar servidor
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`WSDL: http://localhost:${PORT}/soap?wsdl`);
});
