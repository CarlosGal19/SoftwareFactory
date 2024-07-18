const express = require('express');
const { addMajor, getMajors, getMajor, getMyMajor } = require('../controllers/majorController.js')
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/', authMiddleware, (req, res) => {
    addMajor(req, res);
});

router.get('/', (req, res) => {
    getMajors(req, res);
});

router.get('/me', authMiddleware, (req, res) => {
    getMyMajor(req, res);
});

router.get('/:id', authMiddleware, (req, res) => {
    getMajor(req, res);
});

module.exports = router;
