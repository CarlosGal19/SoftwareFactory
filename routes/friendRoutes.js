const express = require('express');
const {
    getFriends,
    deleteFriend,
    getMyFriends,
    getMyNotFriends
} = require('../controllers/friendController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
    getFriends(req, res);
});

router.get('/me/all', authMiddleware, async (req, res) => {
    getMyFriends(req, res);
});

router.get('/me/not', authMiddleware, async (req, res) => {
    getMyNotFriends(req, res);
});

router.delete('/', authMiddleware, async (req, res) => {
    deleteFriend(req, res);
});

module.exports = router;
