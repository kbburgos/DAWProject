"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("odontogramas", {
      codigo: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      cara: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "caradientes",
          key: "codigo"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      tratamiento: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tratamientoodontogramas",
          key: "codigo"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      pos: {
        type: Sequelize.INTEGER
      },
      cedula: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "pasientes",
          key: "cedula"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
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
    return queryInterface.dropTable("odontogramas");
  }
};
