'use strict';
import orm from 'sequelize';
import sequelize from '../connection/connection.js';

class User extends orm.Model {};

User.init({
    name: orm.DataTypes.STRING(45),
    email: orm.DataTypes.STRING(50),
    password: orm.DataTypes.STRING(100),
    roleId: orm.DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users'
});

export default User;