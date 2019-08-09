"use strict";
module.exports = (sequelize, DataTypes) => {
    const odontograma = sequelize.define("odontograma", {
        codigo: {  type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true},
        cara: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "caradientes",
                key: "codigo"
            },
            onUpdate: "cascade",
            onDelete: "cascade"
        },
        tratamiento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "tratamientoodontogramas",
                key: "codigo"
            },
            onUpdate: "cascade",
            onDelete: "cascade"
        },
        pos: DataTypes.INTEGER,
        cedula: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "pacientes",
                key: "cedula"
            },
            onUpdate: "cascade",
            onDelete: "cascade"
        }
    }, {});
    odontograma.associate = function (models) {
        // associations can be defined here
        odontograma.belongsTo(models.caradientes,{foreignKey: 'cara', foreignKeyConstraint: true, targetKey: 'codigo'});
        odontograma.belongsTo(models.tratamientoodontogramas,{foreignKey: 'tratamiento', foreignKeyConstraint: true, targetKey: 'codigo'});
    };
    return odontograma;
};
