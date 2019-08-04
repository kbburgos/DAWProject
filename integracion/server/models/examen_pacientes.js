"use strict";
module.exports = (sequelize, DataTypes) => {
    const examen_pacientes = sequelize.define("examen_pacientes", {
        codigo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        id_paciente: {
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
        image: DataTypes.BLOB
    }, {});
    examen_pacientes.associate = function (models) {
        // associations can be defined here
    };
    return examen_pacientes;
};
