'use strict';
module.exports = (sequelize, DataTypes) => {
    const pacientes = sequelize.define('pacientes', {
        cedula: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        nombre: DataTypes.STRING,
        apellido: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        fechaAtencion: DataTypes.DATE,
        horaAtencion: DataTypes.TIME
    }, {});
    pacientes.associate = function (models) {
        // associations can be defined here
        pacientes.hasMany(models.citas,{foreignKey: 'id_paciente', sourceKey: 'cedula'});
    };
    return pacientes;
};
