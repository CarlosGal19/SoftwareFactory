const friendModel = (sequelize, Sequelize) => {
    const Friend = sequelize.define('friend', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_1_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        user_2_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    },{
        timestamps: false,
        freezeTableName: true,
        tableName: 'friend'
    });

    return Friend;
}

module.exports = friendModel;
