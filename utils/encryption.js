const crypto = require('crypto');
require('dotenv').config();

const algorithm = 'aes-256-cbc';
// Derivar key de ENCRYPTION_SECRET
const key = crypto.scryptSync(process.env.ENCRYPTION_SECRET || 'secret', 'salt', 32);
const iv = Buffer.from(process.env.ENCRYPTION_IV || '0000000000000000'); // 16 bytes

function encrypt(text) {
  if (!text && text !== '') return null;
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(String(text), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decrypt(enc) {
  if (!enc) return null;
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let dec = decipher.update(enc, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

module.exports = { encrypt, decrypt };
