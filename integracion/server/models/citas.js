"use strict";
module.exports = (sequelize, DataTypes) => {
    const citas = sequelize.define("citas", {
        codigo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        titulo: DataTypes.STRING,
        note: DataTypes.TEXT,
        is_active: DataTypes.BOOLEAN,
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
        id_medico: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "usersistems",
                key: "cedula"
            },
            onUpdate: "cascade",
            onDelete: "cascade"
        },
        hora: DataTypes.TIME,
        fecha: DataTypes.DATE
    }, {});
    citas.associate = function (models) {
        // associations can be defined here
    };
    return citas;
};
