const db = require('../db.js');

const Post = db.posts;
const User = db.users;

const getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            where: { is_validated: true },
            attributes: ['id', 'title', 'content', 'updated_at'],
            include: [{
                model: User,
                as: 'creator',
                attributes: ['name', 'last_name']
            }]
        });

        if (!posts) {
            return res.status(404).send({ message: 'Posts not found' });
        }
        return res.status(200).send({ message: 'Posts found', posts });
    } catch (error) {
        console.log(error);
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
        return res.status(200).send({ message: 'Post found', post });
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while retrieving the post.'
        });
    }
}

const getMyPosts = async (req, res) => {
    try {
        const user = req.user;
        const id = user.id;
        const posts = await Post.findAll({ where: { creator_id: id, is_validated: true } });
        if (!posts) {
            return res.status(404).send({ message: 'Posts not found' });
        }
        return res.status(200).send({ message: 'Posts found', posts, user });
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while retrieving the posts.'
        });
    }
}

const createPost = async (req, res) => {
    try {
        const { topic_id, content, url_img, title } = req.body;
        const creator_id = req.user.id;
        if ([content, creator_id, topic_id, title].includes(undefined)) {
            return res.status(400).send({ message: 'Please provide all the required fields.' });
        };

        const post = await Post.create({
            topic_id,
            title,
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
        const { content, url_img, title } = req.body;

        if (!id) return res.status(400).send({ message: 'Please provide the post id.' });

        if ([content, title].includes(undefined)) {
            return res.status(400).send({ message: 'Please provide all the required fields.' });
        };

        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }

        const userId = req.user.id;
        if (post.creator_id !== userId) {
            return res.status(403).send({ message: 'You are not allowed to update this post' });
        }

        post.content = content;
        post.title = title;
        post.url_img = url_img;
        post.is_validated = false;
        await post.save();

        return res.status(200).send({ message: 'Post updated successfully', post });
    } catch (error) {
        return res.status (500).send({
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

const getPostsByTopic = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).send({ message: 'Please provide the topic id.' });
        const posts = await Post.findAll({ where: { topic_id: id, is_validated: true }, attributes: ['id', 'title', 'content', 'updated_at', 'created_at'],
            include: [{
                model: User,
                as: 'creator',
                attributes: ['name', 'last_name']
            }] });
        if (!posts) {
            return res.status(404).send({ message: 'Posts not found' });
        }
        return res.status(200).send({ message: 'Posts found', posts });
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while retrieving the posts.'
        });
    }
}

const getNoValidatedPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({ where: { is_validated: false } });
        if (!posts) {
            return res.status(404).send({ message: 'Posts not found' });
        }
        return res.status(200).send({ message: 'Posts found', posts });
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while retrieving posts.'
        });
    }
}

const validatePost = async (req, res) => {
    try {
        const post_id = req.params.id;
        const status = req.body.status;
        if (!post_id) return res.status(400).send({ message: 'Please provide the post id.' });
        const post = await Post.findByPk(post_id);
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }
        if (status === 'rejected') {
            await post.destroy();
            return res.status(200).send({ message: 'Post rejected successfully' });
        }
        post.is_validated = true;
        await post.save();
        return res.status(200).send({ message: 'Post validated successfully', post });
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while validating the post.'
        });
    }
}

const getCounterNoValidatedPosts = async (req, res) => {
    try {
        const posts = await Post.count({ where: { is_validated: false } });
        return res.status(200).send({ posts });
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while retrieving posts.'
        });
    }
}

module.exports = {
    getPosts,
    getPost,
    getMyPosts,
    createPost,
    updatePost,
    deletePost,
    getPostsByTopic,
    getNoValidatedPosts,
    validatePost,
    getCounterNoValidatedPosts
};
