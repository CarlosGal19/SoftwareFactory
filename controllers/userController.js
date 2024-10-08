const db = require('../db.js');
const generateJWT = require('../helpers/generateJWT.js');
const generateID = require('../helpers/generateID.js');
const registerEmail = require('../helpers/registerEmail.js');
const forgetPassword = require('../helpers/forgetPasswordEmail.js');

const userModel = db.users;

const domains = ['@utma.edu.mx'];

const addUser = async (req, res) => {
    try {
        let { email, user_name } = req.body;
        email = email.toLowerCase();
        const valid = domains.some(domain => email.includes(domain));
        if (!valid) {
            return res.status(400).send({ message: 'Invalid email domain.' });
        }
        const userExists = await userModel.findOne({ where: { [db.Sequelize.Op.or]: { email, user_name } } });
        if (userExists) {
            return res.status(400).send({ message: 'User already exists.' });
        }
        const { name, last_name, birth_date, gender, password } = req.body;
        const user_type_id = req.body.user_type_id || 2;
        const major_id = req.body.major_id || 1;
        if ([user_name, name, last_name, birth_date, gender, user_type_id, major_id, email, password].includes(undefined)) {
            return res.status(400).send({ message: 'Please provide all the required fields.' });
        }
        const user = await userModel.create({
            user_name,
            email,
            name,
            last_name,
            birth_date,
            gender,
            user_type_id,
            major_id,
            password
        });
        registerEmail({
            email,
            name,
            token: user.token
        })
        return res.status(200).send({ message: 'User created successfully. Check your email.', user });
    } catch (error) {
        return res.send({
            message: error.message || 'Some error occurred while creating the user.'
        });
    }
};

const getAdmins = async (req, res) => {
    try {
        const admins = await userModel.findAll({ where: { user_type_id : 1} })
        return res.status(200).send({ message: 'Admins found', admins });
    } catch (error) {
        return res.status(500).send({
            message: error.message || 'Some error occurred while confirming the user.'
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.user.id;
        const { name, last_name, user_name } = req.body;
        if ([name, last_name, user_name].includes(undefined)) {
            return res.status(400).send({ message: 'Please provide all the required fields.' });
        }
        const user = await userModel.findOne({ where: { id } });
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }
        user.name = name;
        user.last_name = last_name;
        user.user_name = user_name;
        await user.save();
        return res.status(200).send({ message: 'User updated', user });
    } catch (error) {
        return res.send({
            message: error.message || 'Some error occurred while updating the user.'
        });
    }
}

const confirmUser = async (req, res) => {
    try {
        const token = req.params.token;
        const user = await userModel.findOne({ where: { token } });
        if (!user) {
            return res.status(404).send({ message: 'Invalid token.' });
        }
        user.confirmed = true;
        user.token = null;
        await user.save();
        return res.status(200).send({ message: 'User confirmed successfully.' });
    } catch (error) {
        return res.status(500).send({
            message: error.message || 'Some error occurred while confirming the user.'
        });
    }

}

const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Fetch the user with the given email and confirmed status
        const user = await userModel.findOne({ where: { email } });

        // If no user is found, respond with a 404 status
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        if (!user.confirmed) {
            return res.status(403).send({ message: "User hasn´t been authenticated" })
        }

        // Authenticate the user with the provided password
        const isPasswordValid = await user.authenticate(password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid password' });
        }

        const type='user';

        // Generate JWT token
        const token = generateJWT(user.id);

        // Respond with a 200 status and the generated token
        return res.status(200).send({ message: 'User logged in', token });
    } catch (error) {
        // Handle any internal server error
        return res.status(500).send({ message: `Internal server error: ${error.message}` });
    }
};

const authAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Fetch the user with the given email and confirmed status
        const user = await userModel.findOne({ where: { email } });

        // If no user is found, respond with a 404 status
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        if (!user.confirmed) {
            return res.status(403).send({ message: "User hasn´t been authenticated" })
        }

        if (user.user_type_id !== 1) {
            return res.status(403).send({ message: 'User is not an admin' });
        }

        // Authenticate the user with the provided password
        const isPasswordValid = await user.authenticate(password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid password' });
        }

        const type='admin';

        // Generate JWT token
        const token = generateJWT(user.id);

        // Respond with a 200 status and the generated token
        return res.status(200).send({ message: 'User logged in', token });
    } catch (error) {
        return res.status(500).send({ message: `Internal server error: ${error.message}` });
    }
}

const userProfile = async (req, res) => {
    try {
        const { user } = req;
        if (!user) return res.status(404).json({ message: `User not found` });
        // Remove password, confirmed and token from the user object
        delete user.dataValues.password;
        delete user.dataValues.confirmed;
        delete user.dataValues.token
        return res.status(200).json({ message: `User profile`, user: user });
    } catch (error) {
        return res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: `Email not provided` });
        const user = await userModel.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: `User not found` });
        user.token = generateID();
        await user.save();
        forgetPassword({
            email,
            name: user.name,
            token: user.token
        })
        return res.status(200).json({ message: `Token with instructions sent`, token: user.token });
    } catch (error) {
        return res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
}

const validateToken = async (req, res) => {
    try {
        const { token } = req.params;
        if (!token) return res.status(400).json({ message: `Token not provided` });
        const userToken = await userModel.findOne({ where: { token } });
        if (!userToken) return res.status(404).json({ message: `User not found` });
        return res.status(200).json({ message: `Token validated` });
    } catch (error) {
        return res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
}

const newPassword = async (req, res) => {
    try {
        const { token } = req.params;
        if (!token) return res.status(400).json({ message: `Token not provided` });
        const userToken = await userModel.findOne({ where: { token } });
        if (!userToken) return res.status(404).json({ message: `User not found` });
        const { password } = req.body;
        if (!password) return res.status(400).json({ message: `Password not provided` });
        userToken.password = password;
        userToken.token = null;
        await userToken.save();
        return res.status(200).json({ message: `Password updated` });
    } catch (error) {
        return res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
}

const getCountAdmin = async (req, res) => {
    try {
        const count = await userModel.count({ where: { user_type_id: 1 } });
        return res.status(200).json({ count });
    } catch (error) {
        return res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
}

module.exports = {
    addUser,
    confirmUser,
    authUser,
    userProfile,
    resetPassword,
    validateToken,
    newPassword,
    updateUser,
    authAdmin,
    getCountAdmin,
    getAdmins
};
