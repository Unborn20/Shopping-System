'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'users',
        'googleId',
        {
          allowNull: true,
          type: Sequelize.STRING(100),          
        }
      )
    ]);
  },
  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('products', 'state')
    ]);
  }
};
