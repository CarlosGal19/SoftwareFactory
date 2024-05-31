const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware.js');
const { addForum, getForum, getForums } = require('../controllers/forumController.js');

const router = express.Router();

router.get('/', async (req, res) => {
    getForums(req, res);
});

router.get('/:id', async (req, res) => {
    getForum(req, res);
});

router.post('/', authMiddleware, async (req, res) => {
    addForum(req, res);
});

module.exports = router;
