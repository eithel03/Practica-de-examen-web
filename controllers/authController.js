const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
  const { username, password, rol } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Faltan datos' });
  const hashed = await bcrypt.hash(password, 10);
  db.query('INSERT INTO usuarios (username, password, rol) VALUES (?, ?, ?)', [username, hashed, rol || 'usuario'], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Usuario creado' });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM usuarios WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results || results.length === 0) return res.status(401).json({ error: 'Credenciales inválidas' });
    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user.id, username: user.username, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  });
};
