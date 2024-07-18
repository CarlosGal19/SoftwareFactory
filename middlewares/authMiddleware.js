const jwt = require('jsonwebtoken');
const db = require('../db.js');

const userModel = db.users;

// Middleware de autenticación
const authMiddleware = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }

        if (!token.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Invalid token format' });
        }

        token = token.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const id = decoded.id

        const user = await userModel.findOne({
            where: { id }
        });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        if(!user.confirmed) {
            return res.status(403).json({ message: 'User not authenticated' });
        }

        // Remove password, token and confirmed fields from user object

        user.password = undefined;
        user.token = undefined;
        user.confirmed = undefined;

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }

        return res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
};

module.exports = authMiddleware;
