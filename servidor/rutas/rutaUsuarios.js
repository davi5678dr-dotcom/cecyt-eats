// servidor/rutas/rutaUsuarios.js
const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const router = express.Router();

// ── POST /api/usuarios/registro ─────────────────────────────────────
router.post('/registro', async (req, res) => {
 const { nombre, correo, contrasena, rol } = req.body;
 try {
 
 // Verificar correo duplicado de forma estricta carácter por carácter usando BINARY
 const [rows] = await db.query(
 'SELECT id_usuario FROM usuarios WHERE BINARY correo = ?', [correo]
 );
 if (rows.length > 0) {
 return res.status(409).json({ error: 'Este correo ya está registrado.' });
 }
 // Encriptar la contraseña con 10 rondas de sal
 const hash = await bcrypt.hash(contrasena, 10);
 const [result] = await db.query(
 'INSERT INTO usuarios (nombre, correo, contrasena, rol) VALUES (?,?,?,?)',
 [nombre, correo, hash, rol || 'alumno']
 );
 res.status(201).json({
 mensaje: 'Usuario registrado correctamente.',
 id_usuario: result.insertId
 });
 } catch (err) {
 res.status(500).json({ error: err.message });
 }
});

// ── POST /api/usuarios/login ─────────────────────────────────────────
router.post('/login', async (req, res) => {
 const { correo, contrasena } = req.body;
 try {
 // Buscamos al usuario de forma exacta usando BINARY para evitar conflictos de texto
 const [rows] = await db.query(
 'SELECT * FROM usuarios WHERE BINARY correo = ?', [correo]
 );
 if (rows.length === 0) {
 // Devolvemos tanto 'error' como 'mensaje' para asegurar que el frontend lo capture bien
 return res.status(401).json({ error: 'Correo o contraseña incorrectos.', mensaje: 'Correo o contraseña incorrectos.' });
 }
 const usuario = rows[0];
 const coincide = await bcrypt.compare(contrasena, usuario.contrasena);
 if (!coincide) {
 return res.status(401).json({ error: 'Correo o contraseña incorrectos.', mensaje: 'Correo o contraseña incorrectos.' });
 }
 // Eliminar contraseña del objeto antes de enviarlo al frontend
 const { contrasena: _, ...usuarioSeguro } = usuario;
 res.json({ mensaje: 'Login exitoso.', usuario: usuarioSeguro });
 } catch (err) {
 res.status(500).json({ error: err.message });
 }
});

module.exports = router;