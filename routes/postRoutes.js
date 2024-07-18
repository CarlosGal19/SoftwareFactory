const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware.js');
const { getPost, getPosts, createPost, updatePost, deletePost, getMyPosts } = require('../controllers/postController.js');

const router = express.Router();

router.get('/', authMiddleware, (req, res) => {
    getPosts(req, res);
});

router.get('/:id', authMiddleware, (req, res) => {
    getPost(req, res);
});

router.get('/me/posts', authMiddleware, (req, res) => {
    getMyPosts(req, res);
});

router.post('/', authMiddleware, (req, res) => {
    createPost(req, res);
});

router.patch('/:id', authMiddleware, (req, res) => {
    updatePost(req, res);
});

router.delete('/:id', authMiddleware, (req, res) => {
    deletePost(req, res);
});

module.exports = router;
