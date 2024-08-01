const jwt = require('jsonwebtoken');

const generateJWT = (id, name, type) => {
    return jwt.sign({ id, name, type }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
}

module.exports = generateJWT;
