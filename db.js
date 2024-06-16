const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, 'root', process.env.DB_PASS, (
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

db.userTypes = require('./models/userType.model.js')(sequelize, Sequelize);
db.majors = require('./models/major.model.js')(sequelize, Sequelize);
db.users = require('./models/user.model.js')(sequelize, Sequelize);
db.forums = require('./models/forum.model.js')(sequelize, Sequelize);
db.topics = require('./models/topic.model.js')(sequelize, Sequelize);
db.posts = require('./models/post.model.js')(sequelize, Sequelize);
db.friendRequests = require('./models/friendRequest.model.js')(sequelize, Sequelize);
db.friends = require('./models/friend.model.js')(sequelize, Sequelize);

module.exports = db;
