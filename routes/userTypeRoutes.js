const express = require('express');
const { addUserType, getUserTypes, getUserType, getCounter } = require('../controllers/userTypeController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const adminMiddleware = require('../middlewares/adminMiddleware.js');

const router = express.Router();

router.post('/', authMiddleware, adminMiddleware, (req, res) => {
    addUserType(req, res);
});

router.get('/', authMiddleware, adminMiddleware, (req, res) => {
    getUserTypes(req, res);
});

router.get('/:id', authMiddleware, adminMiddleware, (req, res) => {
    getUserType(req, res);
});

router.get('/count/all', authMiddleware, adminMiddleware, (req, res) => {
    getCounter(req, res);
});

module.exports = router;
