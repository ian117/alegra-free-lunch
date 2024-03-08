'use strict';
/* eslint-disable */

const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert(
        'recipes',
        [
          {
            id: 'ade3f65f-ee35-4224-ab85-f1c8368a375a',
            name: 'Ensalada de pollo con tomate y queso',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: '1d11093f-7169-4093-8925-4b5338cea2e9',
            name: 'Arroz con pollo al limón',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: '134ff989-335f-495c-942d-b919b4cb8619',
            name: 'Papas rellenas de carne y queso',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: '1e603341-5b4f-4212-bf0f-8f1b13d89aa2',
            name: 'Arroz frito con pollo, tomate y cebolla',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: '263f844e-9b79-4a83-8bb9-f032145f1c35',
            name: 'Ensalada César con pollo y aderezo de limón',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: '4aab51f8-1f4d-4d33-924f-0976bc902b01',
            name: 'Pizza con todo',
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        { transaction },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete(
        'recipes',
        {
          name: {
            [Op.or]: [
              'Ensalada de pollo con tomate y queso', 
              'Arroz con pollo al limón', 
              'Papas rellenas de carne y queso', 
              'Arroz frito con pollo, tomate y cebolla',
              'Ensalada César con pollo y aderezo de limón',
              'Pizza con todo',
            ],
          },
        },
        { transaction },
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
