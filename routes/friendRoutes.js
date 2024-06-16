const express = require('express');
const {
    getFriends,
    deleteFriend
} = require('../controllers/friendController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
    getFriends(req, res);
});

router.delete('/:id', authMiddleware, async (req, res) => {
    deleteFriend(req, res);
});

module.exports = router;
