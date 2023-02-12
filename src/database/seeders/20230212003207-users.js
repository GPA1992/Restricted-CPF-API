'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Users',
        [
            {
                name: 'Product Owner',
                password: 'adm_password',
                role: 'PO',
            },
        ], {}),

    down: async (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
