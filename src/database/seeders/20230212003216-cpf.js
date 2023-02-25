'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('cpf',
        [
            {
                cpf: '22372721313',
                createdAt: Sequelize.fn('NOW'),
                updatedAt: Sequelize.fn('NOW'),
            },
        ], {}),

    down: async (queryInterface) => queryInterface.bulkDelete('cpf', null, {}),
};
