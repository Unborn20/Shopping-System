'use strict';
import orm from 'sequelize';
import sequelize from '../connection/connection.js';

class City extends orm.Model {};

City.init({
  name: orm.DataTypes.STRING(50),
  countryId: orm.DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'City',
  tableName: 'cities'
});

export default City;