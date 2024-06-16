const db = require('../db.js');

const Major = db.majors;

const getMajors = async (req, res) => {
    try {
        const majors = await Major.findAll();
        return res.status(200).send({majors});
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while retrieving majors.'
        });
    }
}

const getMajor = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id) return res.status(400).send({ message: 'Please provide the major id.' });
        const major = await Major.findByPk(id);
        if (!major) {
            return res.status(404).send({ message: 'Major not found' });
        }
        return res.status(200).send({message: 'Major found', major});
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while retrieving the major.'
        });
    }
}

const addMajor = async (req, res) => {
    try {
        const { name, description } = req.body;
        if ([name, description].includes(undefined)) {
            return res.status(400).send({ message: 'Please provide all the required fields.' });
        };
        const major = await Major.create({
            name,
            description
        });

        return res.status(200).send({ message: 'Major created successfully', major });
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while creating the major.'
        });
    }
}

module.exports = {
    addMajor,
    getMajors,
    getMajor
}
