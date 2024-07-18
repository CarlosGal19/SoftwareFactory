const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware.js');
const { addTopic, getTopic, getTopics, deleteTopic, updateTopic } = require('../controllers/topicController.js');

const router = express.Router();

router.get('/all/:id', authMiddleware, async (req, res) => {
    getTopics(req, res);
});

router.get('/:id', authMiddleware, async (req, res) => {
    getTopic(req, res);
});

router.post('/', authMiddleware, async (req, res) => {
    addTopic(req, res);
});

router.patch('/:id', authMiddleware, async (req, res) => {
    updateTopic(req, res);
});

router.delete('/:id', authMiddleware, async (req, res) => {
    deleteTopic(req, res);
});

module.exports = router;
