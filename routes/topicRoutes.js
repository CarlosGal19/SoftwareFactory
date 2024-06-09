const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware.js');
const { addTopic, getTopic, getTopics, deleteTopic } = require('../controllers/topicController.js');

const router = express.Router();

router.get('/', async (req, res) => {
    getTopics(req, res);
});

router.get('/:id', async (req, res) => {
    getTopic(req, res);
});

router.post('/', authMiddleware, async (req, res) => {
    addTopic(req, res);
});

router.delete('/:id', authMiddleware, async (req, res) => {
    deleteTopic(req, res);
});

module.exports = router;
