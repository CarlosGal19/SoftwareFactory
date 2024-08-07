const db = require('../db.js');

const Topic = db.topics;

const getAll = async (req, res) => {
    try {
        const topics = await Topic.findAll();
        if (!topics) {
            return res.status(404).send({ message: 'Topics not found' });
        }
        return res.status(200).send({ message: 'Topics found', topics });
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while retrieving topics.'
        });
    }
}

const getTopics = async (req, res) => {
    try {
        const id = req.params.id;
        const topics = await Topic.findAll({
            where: {
                forum_id: id
            }
        });
        if (!topics) {
            return res.status(404).send({ message: 'Topics not found' });
        }
        return res.status(200).send({ message: 'Topics found', topics });
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while retrieving topics.'
        });
    }
}

const getTopic = async (req, res) => {
    try {
        const id = req.params.id;
        const topic = await Topic.findByPk(id);

        if (!topic) {
            return res.status(404).send({ message: 'Topic not found' });
        }

        return res.status(200).send({ message: 'Topic found', topic });
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while retrieving the topic.'
        });
    }
}

const addTopic = async (req, res) => {
    try {
        const { forum_id, name, description } = req.body;
        const creator_id = req.user.id; // Suponiendo que el ID del usuario está en el campo 'id'

        if ([forum_id, name, creator_id].includes(undefined)) {
            return res.status(400).send({ message: 'Please provide all the required fields.' });
        };

        const topic = await Topic.create({
            forum_id,
            name,
            description,
            creator_id
        });

        return res.status(200).send({ message: 'Topic created successfully', topic });
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while creating the topic.'
        });
    }
}

const deleteTopic = async (req, res) => {
    try {
        const id = req.params.id;

        const userId = req.user.id;

        const topic = await Topic.findByPk(id);

        if (!topic) {
            return res.status(404).send({ message: 'Topic not found' });
        }

        await topic.destroy();

        return res.status(200).send({ message: 'Topic deleted' });
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while deleting the topic.'
        });
    }
}

const updateTopic = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).send({ message: 'Please provide the topic id.' });
        const topic = await Topic.findByPk(id);
        if (!topic) {
            return res.status(404).send({ message: 'Topic not found' });
        }
        const forum_id = req.body.forum_id;
        const name = req.body.name;
        const description = req.body.description;
        const updated_at = new Date();
        if ([forum_id, name].includes(undefined)) {
            return res.status(400).send({ message: 'Please provide all the required fields.' });
        }
        topic.forum_id = forum_id;
        topic.name = name;
        topic.description = description;
        topic.updated_at = updated_at;
        await topic.save();
        return res.status(200).send({ message: 'Topic updated', topic });
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while deleting the topic.'
        });
    }
}

const getCounter = async (req, res) => {
    try {
        const count = await Topic.count();
        return res.status(200).send({ count });
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while retrieving the topic count.'
        });
    }
}

module.exports = {
    addTopic,
    getTopics,
    getTopic,
    deleteTopic,
    updateTopic,
    getCounter,
    getAll
}
