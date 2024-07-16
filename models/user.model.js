const bcrypt = require('bcrypt');
const generateId = require('../helpers/generateID.js');

const userModel = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last_name:{
            type: Sequelize.STRING,
            allowNull: false
        },
        birth_date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        genre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        user_type_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        major_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        token: {
            type: Sequelize.STRING,
            defaultValue: () => generateId() // assuming generateId is defined elsewhere
        },
        confirmed: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        profile_photo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        created_at:{
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        updated_at:{
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'user'
    });

    // Function that hashes the password before saving it to the database
    User.beforeCreate(async (user, options) => {
        if (user.password) {
            const salt = await bcrypt.genSalt();
            user.password = await bcrypt.hash(user.password, salt);
        }
    });

    User.beforeUpdate(async (user, options) => {
        if (user.changed('password')) {
            const salt = await bcrypt.genSalt();
            user.password = await bcrypt.hash(user.password, salt);
        }
    });

    // Function that compares the password with the hashed password in the database
    User.prototype.authenticate = function (password) {
        return bcrypt.compare(password, this.password);
    }

    return User;
}

module.exports = userModel;
