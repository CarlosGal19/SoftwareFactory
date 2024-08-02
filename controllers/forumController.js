const db = require('../db.js');

const Forum = db.forums;

const getForums = async (req, res) => {
    try {
        const forums = await Forum.findAll();
        return res.status(200).send(forums);
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while retrieving forums.'
        });
    }
}

const getForum = async (req, res) => {
    try {
        const id = req.params.id;
        const forum = await Forum.findByPk(id);

        if (!forum) {
            return res.status(404).send({ message: 'Forum not found' });
        }

        return res.status(200).send({ message: 'Forum found', forum });
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while retrieving the forum.'
        });
    }
}

const addForum = async (req, res) => {
    try {
        const { name, description } = req.body;
        const creator_id = req.user.id; // Suponiendo que el ID del usuario está en el campo 'id'

        if ([name, creator_id].includes(undefined)) {
            return res.status(400).send({ message: 'Please provide all the required fields.' });
        };

        const forum = await Forum.create({
            name,
            description,
            creator_id
        });

        return res.status(200).send({ message: 'Forum created successfully', forum });
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while creating the forum.'
        });
    }
}

const deleteForum = async (req, res) => {
    try {
        const id = req.params.id;

        const userId = req.user.id;

        const forum = await Forum.findByPk(id);

        if (!forum) {
            return res.status(404).send({ message: 'Forum not found' });
        }

        if (forum.creator_id !== userId) {
            return res.status(403).send({ message: 'You are not allowed to delete this forum' });
        }

        await forum.destroy();

        return res.status(200).send({ message: 'Forum deleted' });
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while deleting the forum.'
        });
    }
}

const updateForum = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user.id;
        if (!id) return res.status(400).send({ message: 'Please provide the forum id.' });
        const forum = await Forum.findByPk(id);
        if (!forum) {
            return res.status(404).send({ message: 'Forum not found' });
        }
        if (forum.creator_id !== userId) {
            return res.status(403).send({ message: 'You are not allowed to update this forum' });
        }
        const name = req.body.name;
        const description = req.body.description;
        const updated_at = new Date();
        if ([name].includes(undefined)) {
            return res.status(400).send({ message: 'Please provide all the required fields.' });
        };
        forum.name = name;
        forum.description = description;
        forum.updated_at = updated_at;
        await forum.save();
        return res.status(200).send({ message: 'Forum updated', forum });
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while deleting the forum.'
        });
    }
}

const getCounter = async (req, res) => {
    try {
        const count = await Forum.count();
        return res.status(200).send({ count });
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while retrieving the counter.'
        });
    }
}

module.exports = {
    addForum,
    getForums,
    getForum,
    deleteForum,
    updateForum,
    getCounter
}
