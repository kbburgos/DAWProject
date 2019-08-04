"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("citas", {
            codigo: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            titulo: {
                type: Sequelize.STRING
            },
            note: {
                type: Sequelize.TEXT
            },
            is_active: {
                type: Sequelize.BOOLEAN
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
            id_medico: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: "usersistems",
                    key: "cedula"
                },
                onUpdate: "cascade",
                onDelete: "cascade"
            },
            hora: {
                type: Sequelize.TIME
            },
            fecha: {
                type: Sequelize.DATE
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
        return queryInterface.dropTable("citas");
    }
};
