'use strict';
/* eslint-disable */

const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert(
        'pivot_recipes_ingredients',
        [
          // Ensalada de pollo con tomate y queso
          // 4
          {
            recipe_id: 'ade3f65f-ee35-4224-ab85-f1c8368a375a',
            ingredient_id: '90d6d5e4-eb25-4868-80cc-8090f187fb3c',
            quantity_required: 1,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            recipe_id: 'ade3f65f-ee35-4224-ab85-f1c8368a375a',
            ingredient_id: 'ee475442-dd48-4c84-96fb-1d7ed2b2b35b',
            quantity_required: 2,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            recipe_id: 'ade3f65f-ee35-4224-ab85-f1c8368a375a',
            ingredient_id: 'cffc8335-26c8-4b2d-9182-1303016d4293',
            quantity_required: 1,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            recipe_id: 'ade3f65f-ee35-4224-ab85-f1c8368a375a',
            ingredient_id: '8221b712-a298-4c8b-9fab-9df29be5c9a2',
            quantity_required: 2,
            created_at: new Date(),
            updated_at: new Date(),
          },
          //Arroz con pollo al limón
          // 3
          {
            recipe_id: '1d11093f-7169-4093-8925-4b5338cea2e9',
            ingredient_id: '1454d8e0-a140-4c7a-8ce2-60d7b5382529',
            quantity_required: 2,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            recipe_id: '1d11093f-7169-4093-8925-4b5338cea2e9',
            ingredient_id: 'ee475442-dd48-4c84-96fb-1d7ed2b2b35b',
            quantity_required: 1,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            recipe_id: '1d11093f-7169-4093-8925-4b5338cea2e9',
            ingredient_id: '3c3c99ea-46ad-4f34-aa79-0eec74603e7e',
            quantity_required: 1,
            created_at: new Date(),
            updated_at: new Date(),
          },
          // Papas rellenas de carne y queso
          // 3
          {
            recipe_id: '134ff989-335f-495c-942d-b919b4cb8619',
            ingredient_id: 'baf92079-e065-46c2-9b67-2ad0a124891d',
            quantity_required: 2,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            recipe_id: '134ff989-335f-495c-942d-b919b4cb8619',
            ingredient_id: 'dae22602-6eb6-4ac0-a3ec-8505fc667df2',
            quantity_required: 1,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            recipe_id: '134ff989-335f-495c-942d-b919b4cb8619',
            ingredient_id: '8221b712-a298-4c8b-9fab-9df29be5c9a2',
            quantity_required: 1,
            created_at: new Date(),
            updated_at: new Date(),
          },
          // Arroz frito con pollo, tomate y cebolla
          // 4
          {
            recipe_id: '1e603341-5b4f-4212-bf0f-8f1b13d89aa2',
            ingredient_id: '1454d8e0-a140-4c7a-8ce2-60d7b5382529',
            quantity_required: 2,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            recipe_id: '1e603341-5b4f-4212-bf0f-8f1b13d89aa2',
            ingredient_id: 'ee475442-dd48-4c84-96fb-1d7ed2b2b35b',
            quantity_required: 1,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            recipe_id: '1e603341-5b4f-4212-bf0f-8f1b13d89aa2',
            ingredient_id: 'cffc8335-26c8-4b2d-9182-1303016d4293',
            quantity_required: 1,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            recipe_id: '1e603341-5b4f-4212-bf0f-8f1b13d89aa2',
            ingredient_id: '193c611a-9dde-489e-a144-8322998de2bf',
            quantity_required: 1,
            created_at: new Date(),
            updated_at: new Date(),
          },
          // Ensalada César con pollo y aderezo de limón
          // 3
          {
            recipe_id: '263f844e-9b79-4a83-8bb9-f032145f1c35',
            ingredient_id: '90d6d5e4-eb25-4868-80cc-8090f187fb3c',
            quantity_required: 2,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            recipe_id: '263f844e-9b79-4a83-8bb9-f032145f1c35',
            ingredient_id: 'ee475442-dd48-4c84-96fb-1d7ed2b2b35b',
            quantity_required: 1,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            recipe_id: '263f844e-9b79-4a83-8bb9-f032145f1c35',
            ingredient_id: '3c3c99ea-46ad-4f34-aa79-0eec74603e7e',
            quantity_required: 1,
            created_at: new Date(),
            updated_at: new Date(),
          },
          // Pizza con todo
          // 10
          {
            recipe_id: '4aab51f8-1f4d-4d33-924f-0976bc902b01',
            ingredient_id: 'cffc8335-26c8-4b2d-9182-1303016d4293',
            quantity_required: 1,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            recipe_id: '4aab51f8-1f4d-4d33-924f-0976bc902b01',
            ingredient_id: '3c3c99ea-46ad-4f34-aa79-0eec74603e7e',
            quantity_required: 1,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            recipe_id: '4aab51f8-1f4d-4d33-924f-0976bc902b01',
            ingredient_id: 'baf92079-e065-46c2-9b67-2ad0a124891d',
            quantity_required: 2,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            recipe_id: '4aab51f8-1f4d-4d33-924f-0976bc902b01',
            ingredient_id: '1454d8e0-a140-4c7a-8ce2-60d7b5382529',
            quantity_required: 2,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            recipe_id: '4aab51f8-1f4d-4d33-924f-0976bc902b01',
            ingredient_id: 'a9c3da55-abda-41a3-a2ea-751bb75df7b5',
            quantity_required: 1,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            recipe_id: '4aab51f8-1f4d-4d33-924f-0976bc902b01',
            ingredient_id: '90d6d5e4-eb25-4868-80cc-8090f187fb3c',
            quantity_required: 2,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            recipe_id: '4aab51f8-1f4d-4d33-924f-0976bc902b01',
            ingredient_id: '193c611a-9dde-489e-a144-8322998de2bf',
            quantity_required: 1,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            recipe_id: '4aab51f8-1f4d-4d33-924f-0976bc902b01',
            ingredient_id: '8221b712-a298-4c8b-9fab-9df29be5c9a2',
            quantity_required: 2,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            recipe_id: '4aab51f8-1f4d-4d33-924f-0976bc902b01',
            ingredient_id: 'dae22602-6eb6-4ac0-a3ec-8505fc667df2',
            quantity_required: 2,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            recipe_id: '4aab51f8-1f4d-4d33-924f-0976bc902b01',
            ingredient_id: 'ee475442-dd48-4c84-96fb-1d7ed2b2b35b',
            quantity_required: 1,
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
        'pivot_recipes_ingredients',
        {
          recipe_id: {
            [Op.or]: [
              'ade3f65f-ee35-4224-ab85-f1c8368a375a', 
              '1d11093f-7169-4093-8925-4b5338cea2e9', 
              '134ff989-335f-495c-942d-b919b4cb8619', 
              '1e603341-5b4f-4212-bf0f-8f1b13d89aa2',
              '263f844e-9b79-4a83-8bb9-f032145f1c35',
              '4aab51f8-1f4d-4d33-924f-0976bc902b01',
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
