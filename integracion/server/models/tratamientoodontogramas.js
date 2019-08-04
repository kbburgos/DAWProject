"use strict";
module.exports = (sequelize, DataTypes) => {
    const tratamientoodontogramas = sequelize.define("tratamientoodontogramas", {
        codigo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: DataTypes.STRING,
        ruta: DataTypes.TEXT
    }, {});
    tratamientoodontogramas.associate = function (models) {
        // associations can be defined here
    };
    return tratamientoodontogramas;
};
