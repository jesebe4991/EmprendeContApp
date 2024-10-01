const express = require('express');
const pool = require('../db');
const verifyToken = require('../middlewares/auth');

const router = express.Router();

// Obtener todas las URLs
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, url FROM media');
        const videoUrls = result.rows;
        res.json(videoUrls);
    } catch (err) {
        console.error('Error al obtener los videos', err);
        res.status(500).json({ error: 'Error al obtener los videos' });
    }
});

// Agregar una nueva URL
router.post('/', verifyToken, async (req, res) => {
    const { url } = req.body;
    try {
        const result = await pool.query('INSERT INTO media (url) VALUES ($1) RETURNING id, url', [url]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error al agregar la URL', err);
        res.status(500).json({ error: 'Error al agregar la URL' });
    }
});

// Eliminar una URL
router.delete('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM media WHERE id = $1', [id]);
        res.status(200).json({ message: 'URL eliminada correctamente' });
    } catch (err) {
        console.error('Error al eliminar la URL', err);
        res.status(500).json({ error: 'Error al eliminar la URL' });
    }
});

module.exports = router;
