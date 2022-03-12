'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('clients', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v1()')
      },
      address: {
        type: Sequelize.STRING(100)
      },
      cardNumber: {
        type: Sequelize.STRING(16)
      },
      cvv: {
        type: Sequelize.STRING(3)
      },
      userId: {
        type: Sequelize.UUID,
        references: {model: 'users', key: 'id'}
      },
      countryId: {
        type: Sequelize.INTEGER,
        references: {model: 'countries', key: 'id'}
      },
      cityId: {
        type: Sequelize.UUID,
        references: {model: 'cities', key: 'id'}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('clients');
  }
};