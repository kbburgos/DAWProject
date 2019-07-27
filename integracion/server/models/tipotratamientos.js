"use strict";
module.exports = (sequelize, DataTypes) => {
  const tipotratamientos = sequelize.define(
    "tipotratamientos",
    {
      codigo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },

      nombre: DataTypes.STRING,
      descripcion: DataTypes.STRING
    },
    {}
  );
  tipotratamientos.associate = function(models) {
    // associations can be defined here
  };
  return tipotratamientos;
};
