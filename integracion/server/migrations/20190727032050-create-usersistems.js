"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("usersistems", {
      cedula: {
        allowNull: false,

        primaryKey: true,
        type: Sequelize.STRING
      },

      nombreUser: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      apellidoUser: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      is_active: {
        type: Sequelize.BOOLEAN
      },
      rol: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "roles",
          key: "codigo"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      imagen: {
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
    return queryInterface.dropTable("usersistems");
  }
};
