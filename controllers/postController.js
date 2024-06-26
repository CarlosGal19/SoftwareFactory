const db = require('../db.js');

const Post = db.posts;

const getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        return res.status(200).send({posts});
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while retrieving posts.'
        });
    }
}

const getPost = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).send({ message: 'Please provide the post id.' });
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }
        return res.status(200).send({message: 'Post found', post});
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while retrieving the post.'
        });
    }
}

const createPost = async (req, res) => {
    try {
        const { topic_id, content, url_img } = req.body;
        const creator_id = req.user.id; // Suponiendo que el ID del usuario está en el campo 'id'

        if ([ content, creator_id, topic_id].includes(undefined)) {
            return res.status(400).send({ message: 'Please provide all the required fields.' });
        };

        const post = await Post.create({
            topic_id,
            content,
            creator_id,
            url_img
        });
        return res.status(200).send({ message: 'Post created successfully', post });
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while creating the post.'
        });
    }
}

const updatePost = async (req, res) => {
    try {
        const id = req.params.id;
        const { content, url_img } = req.body;

        if(!id) return res.status(400).send({ message: 'Please provide the post id.' });

        if ([content].includes(undefined)) {
            return res.status(400).send({ message: 'Please provide all the required fields.' });
        };

        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }

        post.content = content;
        post.url_img = url_img;
        await post.save();

        return res.status(200).send({ message: 'Post updated successfully', post });
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while updating the post.'
        });
    }
}

const deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).send({ message: 'Please provide the post id.' });

        const userId = req.user.id;

        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }

        if (post.creator_id !== userId) {
            return res.status(403).send({ message: 'You are not allowed to delete this post' });
        }

        await post.destroy();

        return res.status(200).send({ message: 'Post deleted successfully' });
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while deleting the post.'
        });
    }
}

module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
};
