const postModel = (sequelize, Sequelize) => {
    const Post = sequelize.define('post', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        topic_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        creator_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        is_validated: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false
        },
        url_img: {
            type: Sequelize.STRING,
            allowNull: true
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        updated_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'post'
    });

    Post.belongsTo(sequelize.models.user, { foreignKey: 'creator_id', as: 'creator' });

    return Post;
};

module.exports = postModel;
