const express = require('express');
const { addMajor, getMajors, getMajor } = require('../controllers/majorController.js')
// const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/', (req, res) => {
    addMajor(req, res);
});

router.get('/', (req, res) => {
    getMajors(req, res);
});

router.get('/:id', (req, res) => {
    getMajor(req, res);
});

module.exports = router;
