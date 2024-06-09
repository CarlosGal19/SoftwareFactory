const forumModel = (sequelize, Sequelize) => {
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
            allowNull: false,
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
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'forum'
    });

    return Forum;
}

module.exports = forumModel;
