[README.md](https://github.com/user-attachments/files/24099431/README.md)
README – DataCare Solutions – Sistema Integral de Servicios Web

Proyecto desarrollado para el Examen Práctico Integral de Servicios Web (ITI – UTN).
Este sistema combina una API REST moderna con servicios SOAP heredados, integrando autenticación JWT, middleware de seguridad, base de datos MySQL y un servicio SOAP compatible con sistemas antiguos.

Tecnologías utilizadas

Node.js con Express.js para la API REST
MySQL como base de datos
Servicio SOAP implementado con node-soap y WSDL
JWT para autenticación y autorización
Rate limiting con express-rate-limit para protección del API
bcryptjs para cifrado seguro de contraseñas
Postman para pruebas REST y SOAP

Estructura del proyecto

backend/
app.js
.env
package.json

config/
db.js

controllers/
authController.js
pacientesController.js

middleware/
auth.js
logger.js
rateLimit.js

routes/
auth.js
pacientes.js

soap/
service.wsdl
soapServer.js

scripts/
consumerSoap.js

Instalación y ejecución

Clonar el repositorio
git clone https://github.com/usuario/datacare.git

cd datacare/backend

Instalar dependencias
npm install

Crear archivo .env con la configuración:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=datacare
JWT_SECRET=supersecreto
PORT=3000

Ejecutar el servidor
node app.js

El backend quedará disponible en:
http://localhost:3000/

Endpoints de la API REST

Autenticación:
POST /api/auth/login – Devuelve token JWT
POST /api/auth/register – Crea usuario

Pacientes (requiere JWT):
POST /api/pacientes – Crear paciente
GET /api/pacientes – Listar pacientes
GET /api/pacientes/:id – Consultar paciente
PUT /api/pacientes/:id – Actualizar paciente
DELETE /api/pacientes/:id – Borrado lógico (solo admin)

Servicio SOAP

El servicio está disponible en:
http://localhost:3000/soap?wsdl

Operaciones del servicio SOAP:
hola(nombre) – Devuelve saludo
sumar(a, b) – Devuelve la suma
getPaciente(id) – Consulta MySQL y devuelve datos completos del paciente

Probar SOAP desde Node.js

Ejecutar el script incorporado:
node scripts/consumerSoap.js

Salida esperada:
hola => { saludo: 'Hola Diego' }
sumar => { resultado: 12 }
getPaciente => { id: 1, nombre: 'Ana', edad: 30, direccion: 'San Carlos' }

Seguridad y control de acceso

El sistema implementa:
Autenticación basada en JWT
Roles: usuario y admin
Rate limiting global
Hash de contraseñas con bcryptjs
Middleware de logging para cada solicitud
Borrado lógico en la tabla pacientes

Modelo de base de datos

Tabla pacientes:
id INT AUTO_INCREMENT PRIMARY KEY
nombre VARCHAR(100)
edad INT
direccion VARCHAR(200)
activo TINYINT DEFAULT 1

Uso de Inteligencia Artificial

Se utilizó IA como apoyo para:
Corrección de errores en tiempo real
Optimización de controladores y middleware

Licencia

Proyecto realizado únicamente con fines académicos para la UTN.
No apto para uso comercial.

Autores

Eithel Herrera Rojas
Diego Chavala
