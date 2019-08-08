"use strict";
module.exports = (sequelize, DataTypes) => {
    const caradientes = sequelize.define("caradientes", {
        codigo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: DataTypes.STRING
    }, {});
    caradientes.associate = function (models) {
        // associations can be defined here
        caradientes.hasMany(models.odontograma,{foreignKey: 'cara', sourceKey: 'codigo'});
    };
    return caradientes;
};
