const bcrypt = require('bcryptjs');

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);

async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

async function comparePassword(password, hashed) {
  if (!hashed) return false;
  return bcrypt.compare(password, hashed);
}

module.exports = { hashPassword, comparePassword };

