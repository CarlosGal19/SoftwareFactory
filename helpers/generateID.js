const crypto = require('crypto');

function generateID() {
    return crypto.randomBytes(16).toString('hex');
}

module.exports = generateID;
