// servidor/db.js
require('dotenv').config(); // Carga las variables del archivo .env
const mysql = require('mysql2/promise');
const conexion = mysql.createPool({
 host: process.env.DB_HOST || 'localhost',
 port: process.env.DB_PORT || 3306,
 user: process.env.DB_USER || 'root',
 password: process.env.DB_PASSWORD || '',
 database: process.env.DB_NAME || 'cecyt_eats',
 waitForConnections: true,
 connectionLimit: 10,
 // CORREGIDO: Desactivamos SSL por completo para evitar el bloqueo en Render con bases de datos gratuitas
 ssl: false,
});
conexion.getConnection()
 .then(() => console.log('✔ Conectado a MySQL'))
 .catch(err => console.error('✖ Error de conexión MySQL:', err.message));
module.exports = conexion;