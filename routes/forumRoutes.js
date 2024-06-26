const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware.js');
const { addForum, getForum, getForums, deleteForum, updateForum } = require('../controllers/forumController.js');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
    getForums(req, res);
});

router.get('/:id', authMiddleware,async (req, res) => {
    getForum(req, res);
});

router.post('/', authMiddleware, async (req, res) => {
    addForum(req, res);
});

router.patch('/:id', authMiddleware, async (req, res) => {
    updateForum(req, res);
});

router.delete('/:id', authMiddleware, async (req, res) => {
    deleteForum(req, res);
});

module.exports = router;
