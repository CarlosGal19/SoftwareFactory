const majorModel = (sequelize, Sequelize) => {
    const Major = sequelize.define('major', {
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
        tableName: 'major'
    });

    return Major;
}

module.exports = majorModel;
