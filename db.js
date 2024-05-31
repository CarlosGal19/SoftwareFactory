const Sequelize = require('sequelize');

const sequelize = new Sequelize("utma", 'root', process.env.DB_PASS, (
    {
        host: process.env.DB_HOST,
        dialect: 'mariadb'
    }
));

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.log('Unable to connect to the database: ', error);
    }
})();

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./models/user.model.js')(sequelize, Sequelize)
db.forums = require('./models/forum.model.js')(sequelize, Sequelize)

module.exports = db;
