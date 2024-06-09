const express = require('express');
const {
    getFriendRequest,
    getFriendRequests,
    addFriendRequest,
    updateFriendRequest,
    deleteFriendRequest
} = require('../controllers/friendRequestController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
    getFriendRequests(req, res);
});

router.get('/:id', authMiddleware, async (req, res) => {
    getFriendRequest(req, res);
});

router.post('/', authMiddleware, async (req, res) => {
    addFriendRequest(req, res);
});

router.patch('/:id', authMiddleware, async (req, res) => {
    updateFriendRequest(req, res);
});

router.delete('/:id', authMiddleware, async (req, res) => {
    deleteFriendRequest(req, res);
});

module.exports = router;
