const userModel = (sequelize, Sequelize) => {
    const Forum = sequelize.define('forum', {
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
            allowNull: true,
        },
        creator_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        created_at:{
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        updated_at:{
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        deleted_at: {
            type: Sequelize.DATE,
            allowNull: true
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'forum'
    });

    return Forum;
}

module.exports = userModel;
