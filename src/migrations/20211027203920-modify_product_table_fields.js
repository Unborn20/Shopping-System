'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'products',
        'state',
        {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: true
        }
      )
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('products', 'state')
    ]);
  }
};
