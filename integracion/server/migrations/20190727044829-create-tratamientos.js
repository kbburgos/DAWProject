"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("tratamientos", {
      codigo: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      cedula: {
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
      tipo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tipotratamientos",
          key: "codigo"
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
    return queryInterface.dropTable("tratamientos");
  }
};
