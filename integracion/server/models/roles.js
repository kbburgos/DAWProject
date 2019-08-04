"use strict";
module.exports = (sequelize, DataTypes) => {
    const roles = sequelize.define("roles", {
        codigo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre: DataTypes.STRING,
        descripcion: DataTypes.STRING
    }, {freezeTableName: true});
    roles.associate = function (models) {
        // associations can be defined here
        roles.hasMany(models.usersistems,{foreignKey: 'rol', sourceKey: 'codigo'});
    };
    return roles;
};
