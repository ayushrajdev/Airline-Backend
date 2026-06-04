'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        const airplanes = [];

        for (let i = 1; i <= 20; i++) {
            airplanes.push({
                modelNumber: `AIR-${Math.floor(1000 + Math.random() * 9000)}`,
                capacity: Math.floor(50 + Math.random() * 451), // 50 - 500
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        await queryInterface.bulkInsert('Airplanes', airplanes);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         * 
         */
    },
};
