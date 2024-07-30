const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware.js');
const adminMiddleware = require('../middlewares/adminMiddleware.js');
const { addTopic, getTopic, getTopics, deleteTopic, updateTopic } = require('../controllers/topicController.js');

const router = express.Router();

router.get('/all/:id', authMiddleware, async (req, res) => {
    getTopics(req, res);
});

router.get('/:id', authMiddleware, async (req, res) => {
    getTopic(req, res);
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
