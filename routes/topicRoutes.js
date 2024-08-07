const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware.js');
const adminMiddleware = require('../middlewares/adminMiddleware.js');
const { addTopic, getTopic, getTopics, deleteTopic, updateTopic, getCounter,getAll } = require('../controllers/topicController.js');

const router = express.Router();

router.get('/all/:id', authMiddleware, async (req, res) => {
    getTopics(req, res);
});

router.get('/', authMiddleware, async (req, res) => {
    getAll(req, res);
});

router.get('/:id', authMiddleware, async (req, res) => {
    getTopic(req, res);
});

router.get('/count/all', authMiddleware, adminMiddleware, async (req, res) => {
    getCounter(req, res);
});

router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
    addTopic(req, res);
});

router.patch('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    updateTopic(req, res);
});

router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    deleteTopic(req, res);
});

module.exports = router;
