"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("examen_pacientes", {
      codigo: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      id_paciente: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "pacientes",
          key: "cedula"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      descripcion: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.BLOB
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("examen_pacientes");
  }
};
