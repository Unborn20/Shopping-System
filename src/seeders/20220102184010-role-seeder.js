'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {  
    return queryInterface.bulkInsert('roles', [{
      name: 'Employee'
    },{
      name: 'Client'
    }], {});
  },
  down: (queryInterface, Sequelize) => {    
    return queryInterface.bulkDelete('roles', null, {});
  }
};
