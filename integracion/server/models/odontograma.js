"use strict";
module.exports = (sequelize, DataTypes) => {
  const odontograma = sequelize.define(
    "odontograma",
    {
      codigo: DataTypes.INTEGER,

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
    },
    {}
  );
  odontograma.associate = function(models) {
    // associations can be defined here
  };
  return odontograma;
};
