const express = require('express');
const { addUserType, getUserTypes, getUserType } = require('../controllers/userTypeController.js')
// const authMiddleware = require('../middlewares/authMiddleware.js');


const router = express.Router();

router.post('/', (req, res) => {
    addUserType(req, res);
});

router.get('/', (req, res) => {
    getUserTypes(req, res);
});

router.get('/:id', (req, res) => {
    getUserType(req, res);
});

module.exports = router;
