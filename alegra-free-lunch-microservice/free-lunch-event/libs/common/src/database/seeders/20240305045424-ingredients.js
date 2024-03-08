'use strict';
/* eslint-disable */

const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert(
        'ingredients',
        [
          {
            id: 'cffc8335-26c8-4b2d-9182-1303016d4293',
            name: 'tomato',
            quantity_stock: 5,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: '3c3c99ea-46ad-4f34-aa79-0eec74603e7e',
            name: 'lemon',
            quantity_stock: 5,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 'baf92079-e065-46c2-9b67-2ad0a124891d',
            name: 'potato',
            quantity_stock: 5,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: '1454d8e0-a140-4c7a-8ce2-60d7b5382529',
            name: 'rice',
            quantity_stock: 5,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 'a9c3da55-abda-41a3-a2ea-751bb75df7b5',
            name: 'ketchup',
            quantity_stock: 5,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: '90d6d5e4-eb25-4868-80cc-8090f187fb3c',
            name: 'lettuce',
            quantity_stock: 5,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: '193c611a-9dde-489e-a144-8322998de2bf',
            name: 'onion',
            quantity_stock: 5,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: '8221b712-a298-4c8b-9fab-9df29be5c9a2',
            name: 'cheese',
            quantity_stock: 5,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 'dae22602-6eb6-4ac0-a3ec-8505fc667df2',
            name: 'meat',
            quantity_stock: 5,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 'ee475442-dd48-4c84-96fb-1d7ed2b2b35b',
            name: 'chicken',
            quantity_stock: 5,
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
        'ingredients',
        {
          name: {
            [Op.or]: [
              'tomato', 
              'lemon', 
              'potato', 
              'rice',
              'ketchup',
              'lettuce',
              'onion',
              'cheese',
              'meat',
              'chicken'
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
