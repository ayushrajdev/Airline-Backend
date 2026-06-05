'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addConstraint('Airports', {
            fields: ['cityId'],
            type: 'foreign key',
            references: {
                field: 'id',
                table: 'Cities',
            },
            onDelete: 'cascade',
            name:"fk_city"
        });
    },

    async down(queryInterface, Sequelize) {
        queryInterface.removeConstraint('Airports', 'fk_city');
    },
};
