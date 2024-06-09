const db = require('../db.js');

const Topic = db.topics;

const getTopics = async (req, res) => {
    try {
        const topics = await Topic.findAll();
        return res.status(200).send({topics});
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

        return res.status(200).send({message: 'Topic found', topic});
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while retrieving the topic.'
        });
    }
}

const addTopic = async (req, res) => {
    try {

        const forum_id = req.body.forum_id;
        const name = req.body.name;
        const description = req.body.description;
        const creator_id = req.user.id; // Suponiendo que el ID del usuario está en el campo 'id'

        if ([forum_id, name, creator_id].includes(undefined)) {
            return res.status(400).send({ message: 'Please provide all the required fields.' });
        };

        const topic = await Topic.create({
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

        if (topic.creator_id !== userId) {
            return res.status(403).send({ message: 'You are not allowed to delete this topic' });
        }

        await topic.destroy();

        return res.status(200).send({message: 'Topic deleted'});
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while deleting the topic.'
        });
    }
}

module.exports = {
    addTopic,
    getTopics,
    getTopic,
    deleteTopic
}
