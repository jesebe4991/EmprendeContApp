// controllers/userController.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db'); 
const verifyToken = require('../middlewares/auth') 

const router = express.Router();

// Registro de usuario
router.post('/registro', async (req, res) => {
  const { nombre, email, password, rol } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, email, password, rol) VALUES ($1, $2, $3, $4) RETURNING id',
      [nombre, email, hashedPassword, rol]
    );
    console.log(nombre+email+rol)
    // const token = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).send('usuario creado');
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Error en el registro.');
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  const { nombre, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE nombre = $1', [nombre]);
    if (result.rows.length === 0) return res.status(404).send('Usuario no encontrado.');

    const validPassword = await bcrypt.compare(password, result.rows[0].password);
    if (!validPassword) return res.status(401).send('Contraseña incorrecta.');

    const token = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const usuarioId = result.rows[0].id
    const usuarioName = result.rows[0].nombre
    const usuarioEmail = result.rows[0].email
    const usuarioRol = result.rows[0].rol
    res.status(200).send({ auth: true, token, usuarioId, usuarioName, usuarioEmail, usuarioRol });
  } catch (error) {
    res.status(500).send('Error en el login.');
  }
});

// Actualización de usuario
router.put('/:id', verifyToken, async (req, res) => {
  const { nombre, email } = req.body;
  const { id } = req.params;

  try {
    await pool.query('UPDATE usuarios SET nombre = $1, email = $2 WHERE id = $3', [nombre, email, id]);
    res.status(200).send('Usuario actualizado.');
  } catch (error) {
    res.status(500).send('Error al actualizar el usuario.');
  }
});

// Eliminación de usuario
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
    res.status(200).send('Usuario eliminado.');
  } catch (error) {
    res.status(500).send('Error al eliminar el usuario.');
  }
});

module.exports = router;
