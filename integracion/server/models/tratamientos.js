"use strict";
module.exports = (sequelize, DataTypes) => {
    const tratamientos = sequelize.define("tratamientos", {
        codigo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        cedula: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "pacientes",
                key: "cedula"
            },
            onUpdate: "cascade",
            onDelete: "cascade"
        },
        descripcion: DataTypes.TEXT,
        tipo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "tipotratamientos",
                key: "codigo"
            },
            onUpdate: "cascade",
            onDelete: "cascade"
        }
    }, {});
    tratamientos.associate = function (models) {
        // associations can be defined here
    };
    return tratamientos;
};
