const express = require('express');
const { addUserType, getUserTypes, getUserType } = require('../controllers/userTypeController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');


const router = express.Router();

router.post('/', authMiddleware, (req, res) => {
    addUserType(req, res);
});

router.get('/', authMiddleware, (req, res) => {
    getUserTypes(req, res);
});

router.get('/:id', authMiddleware, (req, res) => {
    getUserType(req, res);
});

module.exports = router;
