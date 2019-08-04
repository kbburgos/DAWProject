"use strict";
module.exports = (sequelize, DataTypes) => {
    const usersistems = sequelize.define("usersistems", {
        cedula: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING
        },
        nombreUser: DataTypes.STRING,
        pasword: DataTypes.STRING,
        apellidoUser: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        is_active: DataTypes.BOOLEAN,
        rol: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "roles",
                key: "codigo"
            },
            onUpdate: "cascade",
            onDelete: "cascade"
        },
        image: DataTypes.BLOB
    }, {freezeTableName: true});
    usersistems.associate = function (models) {
        // associations can be defined here
        usersistems.belongsTo(models.roles, {foreignKey: 'rol', foreignKeyConstraint: true, targetKey: 'codigo'});
    };
    return usersistems;
};
