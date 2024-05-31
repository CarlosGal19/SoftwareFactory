const db = require('../db.js');
const jwt = require('jsonwebtoken');

const forumModel = db.forums;

const getForums = async (req, res) => {
    try {
        const forums = await forumModel.findAll();

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
        const forum = await forumModel.findByPk(id);

        if (!forum) {
            return res.status(404).send({ message: 'Forum not found' });
        }

        return res.status(200).send({message: 'Forum found', forum});
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while retrieving the forum.'
        });
    }
}

const addForum = async (req, res) => {
    try {
        let token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }

        if (!token.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Invalid token format' });
        }

        token = token.split(' ')[1];

        const name = req.body.name;
        const description = req.body.description;
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Usar verify para verificar el token
        const creator_id = decoded.id; // Suponiendo que el ID del usuario está en el campo 'id'

        if ([name, creator_id].includes(undefined)) {
            return res.status(400).send({ message: 'Please provide all the required fields.' });
        };

        const forum = await forumModel.create({
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

module.exports = {
    addForum,
    getForums,
    getForum
}
