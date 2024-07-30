const db = require('../db.js');

const userTypeModel = db.userTypes;

const adminMiddleware = async (req, res, next) => {
    try {
        const user_type_id = req.user.user_type_id;

        const userType = await userTypeModel.findOne({
            where: { id: user_type_id }
        });

        if (!userType) {
            return res.status(404).json({ message: 'User type not found' });
        }

        if (userType.name !== 'Admin') {
            return res.status(403).json({ message: 'User is not an admin' });
        }

        next();
    } catch (error) {
        return res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
};

module.exports = adminMiddleware;
