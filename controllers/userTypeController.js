const db = require('../db.js');

const UserType = db.userTypes;

const getUserTypes = async (req, res) => {
    try {
        const userTypes = await UserType.findAll();
        return res.status(200).send({userTypes});
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while retrieving user types.'
        });
    }
}

const getUserType = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id) return res.status(400).send({ message: 'Please provide the user type id.' });
        const userType = await UserType.findByPk(id);
        if (!userType) {
            return res.status(404).send({ message: 'User type not found' });
        }
        return res.status(200).send({message: 'User type found', userType});
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while retrieving the user type.'
        });
    }
}

const addUserType = async (req, res) => {
    try {
        const name = req.body.name;
        const description = req.body.description;
        if ([name, description].includes(undefined)) {
            return res.status(400).send({ message: 'Please provide all the required fields.' });
        };
        const userType = await UserType.create({
            name,
            description
        });

        return res.status(200).send({ message: 'User type created successfully', userType });
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while creating the user type.'
        });
    }
}

module.exports = {
    addUserType,
    getUserTypes,
    getUserType
}