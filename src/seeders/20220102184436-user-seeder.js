'use strict';
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashPassword = await bcrypt.hash('123', 10);
    return queryInterface.bulkInsert('users', [{
      name: 'Sergio Riaño',
      email: 'sergio@gmail.com',
      password: hashPassword,
      roleId: 1
    },{
      name: 'Annie Leondhart',
      email: 'annie@gmail.com',
      password: hashPassword,
      roleId: 1
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});    
  }
};
