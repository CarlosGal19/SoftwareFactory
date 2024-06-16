const express = require('express');
const {
    getFriendRequests,
    addFriendRequest,
    acceptFriendRequest,
    deleteFriendRequest
} = require('../controllers/friendRequestController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
    getFriendRequests(req, res);
});

router.post('/', authMiddleware, async (req, res) => {
    addFriendRequest(req, res);
});

router.patch('/', authMiddleware, async (req, res) => {
    acceptFriendRequest(req, res);
});

router.delete('/:id', authMiddleware, async (req, res) => {
    deleteFriendRequest(req, res);
});

module.exports = router;
