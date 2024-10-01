// controllers/transactionController.js
const express = require('express');
const pool = require('../db'); 
const verifyToken = require('../middlewares/auth');

const router = express.Router();

// Crear transacción
router.post('/', verifyToken, async (req, res) => {
  const { tipo, monto, descripcion, fecha } = req.body;

  try {
    await pool.query(
      'INSERT INTO transacciones (usuario_id, tipo, monto, descripcion, fecha) VALUES ($1, $2, $3, $4, $5)',
      [req.userId, tipo, monto, descripcion, fecha]
    );
    res.status(201).send('Transacción creada.');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Obtener todas las transacciones
router.get('/', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM transacciones WHERE usuario_id = $1', [req.userId]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).send('Error al obtener transacciones.');
  }
});

// Actualizar transacción
router.put('/:id', verifyToken, async (req, res) => {
  const { tipo, monto, descripcion } = req.body;
  const { id } = req.params;

  try {
    await pool.query(
      'UPDATE transacciones SET tipo = $1, monto = $2, descripcion = $3 WHERE id = $4',
      [tipo, monto, descripcion, id]
    );
    res.status(200).send('Transacción actualizada.');
  } catch (error) {
    res.status(500).send('Error al actualizar transacción.');
  }
});

// Eliminar transacción
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM transacciones WHERE id = $1', [id]);
    res.status(200).send('Transacción eliminada.');
  } catch (error) {
    res.status(500).send('Error al eliminar transacción.');
  }
});

// Obtener estadísticas de transacciones
router.get('/estadisticas/:period', verifyToken, async (req, res) => {
  const { period } = req.params;
  const userId = req.userId;

  try {
    let query;
    switch (period) {
      case 'daily':
        query = `SELECT DATE(fecha) as fecha, 
                        SUM(CASE WHEN tipo = 'ingreso' THEN monto ELSE 0 END) as ingresos, 
                        SUM(CASE WHEN tipo = 'gasto' THEN monto ELSE 0 END) as gastos
                 FROM transacciones 
                 WHERE usuario_id = $1 
                 GROUP BY DATE(fecha)
                 ORDER BY fecha DESC`;
        break;
      case 'weekly':
        query = `SELECT DATE_TRUNC('week', fecha) as fecha, 
                        SUM(CASE WHEN tipo = 'ingreso' THEN monto ELSE 0 END) as ingresos, 
                        SUM(CASE WHEN tipo = 'gasto' THEN monto ELSE 0 END) as gastos
                 FROM transacciones 
                 WHERE usuario_id = $1 
                 GROUP BY DATE_TRUNC('week', fecha)
                 ORDER BY fecha DESC`;
        break;
      case 'monthly':
        query = `SELECT DATE_TRUNC('month', fecha) as fecha, 
                        SUM(CASE WHEN tipo = 'ingreso' THEN monto ELSE 0 END) as ingresos, 
                        SUM(CASE WHEN tipo = 'gasto' THEN monto ELSE 0 END) as gastos
                 FROM transacciones 
                 WHERE usuario_id = $1 
                 GROUP BY DATE_TRUNC('month', fecha)
                 ORDER BY fecha DESC`;
        break;
      case 'yearly':
        query = `SELECT DATE_TRUNC('year', fecha) as fecha, 
                        SUM(CASE WHEN tipo = 'ingreso' THEN monto ELSE 0 END) as ingresos, 
                        SUM(CASE WHEN tipo = 'gasto' THEN monto ELSE 0 END) as gastos
                 FROM transacciones 
                 WHERE usuario_id = $1 
                 GROUP BY DATE_TRUNC('year', fecha)
                 ORDER BY fecha DESC`;
        break;
      default:
        return res.status(400).send('Período no válido.');
    }

    const result = await pool.query(query, [userId]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).send('Error al obtener estadísticas.');
  }
});


module.exports = router;
