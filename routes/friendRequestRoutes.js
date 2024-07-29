const express = require('express');
const {
    getFriendRequests,
    addFriendRequest,
    updateFriendRequest
} = require('../controllers/friendRequestController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
    getFriendRequests(req, res);
});

router.post('/:id', authMiddleware, async (req, res) => {
    addFriendRequest(req, res);
});

router.patch('/', authMiddleware, async (req, res) => {
    updateFriendRequest(req, res);
});

module.exports = router;
