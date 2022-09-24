module.exports = (sequelize, Sequelize) => {

    const Tutorial = sequelize.define("passwordres", {

        EMAIL: {
            type: Sequelize.STRING
        },
        TOKEN: {
            type: Sequelize.STRING
        },
        state:{
            type: Sequelize.STRING,
            enum: ["ACTIVE", "DISABLE"],
            default: "ACTIVE",
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
    });
    return Tutorial;
};

