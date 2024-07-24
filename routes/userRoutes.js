const express = require('express');
const { addUser, confirmUser, authUser, userProfile, resetPassword, validateToken, newPassword, updateUser } = require('../controllers/userController.js')
const authMiddleware = require('../middlewares/authMiddleware.js');


const router = express.Router();

router.post('/', (req, res) => {
    addUser(req, res);
});

router.patch('/update', authMiddleware, (req, res) => {
    updateUser(req, res);
})

router.get('/confirm/:token', (req, res) => {
    confirmUser(req, res);
});

router.post('/login', (req, res) => {
    authUser(req, res);
});

router.get('/profile', authMiddleware, (req, res) => {
    userProfile(req, res);
});

router.post('/forget-password', (req, res) => {
    resetPassword(req, res);
});

router.get('/forget-password/:token', (req, res) => {
    validateToken(req, res);
});

router.post('/forget-password/:token', (req, res) => {
    newPassword(req, res);
});

module.exports = router;
