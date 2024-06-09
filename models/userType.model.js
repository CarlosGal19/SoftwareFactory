const userTypeModel = (sequelize, Sequelize) => {
    const UserType = sequelize.define('user_type', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
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
        tableName: 'user_type'
    });

    return UserType;
}

module.exports = userTypeModel;
