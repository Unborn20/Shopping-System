'use strict';
import orm from 'sequelize';
import sequelize from '../connection/connection.js';

class Role extends orm.Model {};

Role.init({ 
  role: orm.DataTypes.STRING(45)
}, {
  sequelize,
  modelName: 'Role',
  tableName: 'roles'
});

export default Role;