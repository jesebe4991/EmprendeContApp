// controllers/ahorroController.js
const express = require('express');
const pool = require('../db'); 
const verifyToken = require('../middlewares/auth');

const router = express.Router();

// Guardar o actualizar el valor del ahorro mensual
router.post('/', verifyToken, async (req, res) => {
  const {usuario_id, mes, valor_ahorro } = req.body;

  try {
    await pool.query(
      `INSERT INTO ahorros (usuario_id, mes, valor_ahorro) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (usuario_id, mes) 
       DO UPDATE SET valor_ahorro = EXCLUDED.valor_ahorro`,
      [usuario_id, mes, valor_ahorro]
    );
    res.status(201).send('Valor de ahorro guardado.');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Guardar o actualizar los objetivos de ahorro
router.post('/objetivo', verifyToken, async (req, res) => {
  const { usuario_id, objetivo, valor } = req.body;
  console.log(req.body)

  try {
    await pool.query(
      `INSERT INTO objetivos (usuario_id, objetivo, valor) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (usuario_id, objetivo) 
       DO UPDATE SET valor = EXCLUDED.valor`,
      [usuario_id, objetivo, valor]
    );
    res.status(201).send('Objetivo guardado.');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Obtener ahorros mensuales
router.get('/', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ahorros WHERE usuario_id = $1', [req.userId]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).send('Error al obtener ahorros.');
  }
});

router.delete('/objetivo/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
      await pool.query('DELETE FROM objetivos WHERE id = $1 AND usuario_id = $2', [id, req.userId]);
      res.status(200).send('Objetivo eliminado.');
  } catch (error) {
      res.status(500).send('Error al eliminar el objetivo.');
  }
});

router.put('/objetivo/:id', verifyToken, async (req, res) => {
  const { objetivo, valor } = req.body;
  const { id } = req.params;
  console.log('Ingreso')
  try {
      await pool.query('UPDATE objetivos SET objetivo = $1, valor = $2 WHERE id = $1 AND usuario_id = $2', [objetivo, valor, id, req.userId]);
      res.status(200).send('Objetivo Actualizado.');
  } catch (error) {
      res.status(500).send('Error al Actualizado el objetivo.');
  }
});

// Obtener objetivos de ahorro
router.get('/objetivos', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM objetivos WHERE usuario_id = $1', [req.userId]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).send('Error al obtener objetivos.');
  }
});

router.get('/estadisticas', verifyToken, async (req, res) => {
  try {
      const result = await pool.query(`
          SELECT 
    CASE EXTRACT(MONTH FROM t.fecha)
        WHEN 1 THEN 'Enero'
        WHEN 2 THEN 'Febrero'
        WHEN 3 THEN 'Marzo'
        WHEN 4 THEN 'Abril'
        WHEN 5 THEN 'Mayo'
        WHEN 6 THEN 'Junio'
        WHEN 7 THEN 'Julio'
        WHEN 8 THEN 'Agosto'
        WHEN 9 THEN 'Septiembre'
        WHEN 10 THEN 'Octubre'
        WHEN 11 THEN 'Noviembre'
        WHEN 12 THEN 'Diciembre'
    END AS mes,
    SUM(CASE WHEN t.tipo = 'ingreso' THEN t.monto ELSE 0 END) AS ingresos, 
    SUM(CASE WHEN t.tipo = 'gasto' THEN t.monto ELSE 0 END) AS gastos,
    COALESCE(a.valor_ahorro, 0) AS ahorro
FROM transacciones AS t
LEFT JOIN ahorros AS a
    ON t.usuario_id = a.usuario_id
    AND CASE EXTRACT(MONTH FROM t.fecha)
        WHEN 1 THEN 'Enero'
        WHEN 2 THEN 'Febrero'
        WHEN 3 THEN 'Marzo'
        WHEN 4 THEN 'Abril'
        WHEN 5 THEN 'Mayo'
        WHEN 6 THEN 'Junio'
        WHEN 7 THEN 'Julio'
        WHEN 8 THEN 'Agosto'
        WHEN 9 THEN 'Septiembre'
        WHEN 10 THEN 'Octubre'
        WHEN 11 THEN 'Noviembre'
        WHEN 12 THEN 'Diciembre'
    END = a.mes
WHERE t.usuario_id = $1 
GROUP BY EXTRACT(YEAR FROM t.fecha), EXTRACT(MONTH FROM t.fecha), a.valor_ahorro
ORDER BY EXTRACT(YEAR FROM t.fecha), EXTRACT(MONTH FROM t.fecha)
      `, [req.userId]);

      res.status(200).json(result.rows);
  } catch (error) {
      res.status(500).send('Error al obtener estadísticas mensuales.');
  }
});


module.exports = router;
