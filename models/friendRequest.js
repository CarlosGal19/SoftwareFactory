const friendRequestModel = (sequelize, Sequelize) => {
    const FriendRequest = sequelize.define('friend_request', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sender_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        receiver_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM('pending', 'accepted', 'rejected'),
            allowNull: false,
            defaultValue: 'pending'
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        updated_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    },{
        timestamps: false,
        freezeTableName: true,
        tableName: 'friend_request'
    });

    return FriendRequest;
};

module.exports = friendRequestModel;
