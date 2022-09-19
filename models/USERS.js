module.exports = (sequelize, Sequelize) => {

    const Tutorial = sequelize.define("login", {

        FIRST_NAME: {
            type: Sequelize.STRING
        },
        LAST_NAME: {
            type: Sequelize.STRING
        },
        EMAIL: {
            type: Sequelize.STRING
        },
        PASSWORD: {
            type: Sequelize.STRING
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
    });
    return Tutorial;
};