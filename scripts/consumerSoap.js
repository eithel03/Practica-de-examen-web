const soap = require('soap');
const url = 'http://localhost:3000/soap?wsdl';

soap.createClient(url, (err, client) => {
  if (err) return console.error('Error creando cliente SOAP:', err);

  // -------------------------
  // 1. hola()
  // -------------------------
  client.hola({ nombre: 'Diego' }, (err, result) => {
    if (err) console.error("Error hola:", err);
    else console.log('hola =>', result);
  });

  // -------------------------
  // 2. sumar()
  // -------------------------
  client.sumar({ a: 5, b: 7 }, (err, result) => {
    if (err) console.error("Error sumar:", err);
    else console.log('sumar =>', result);
  });

  // -------------------------
  // 3. getPaciente()
  // -------------------------
  client.getPaciente({ id: 1 }, (err, result) => {
    if (err) console.error("Error getPaciente:", err);
    else console.log('getPaciente =>', result);
  });
});
