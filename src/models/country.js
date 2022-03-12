'use strict';
import orm from 'sequelize';
import sequelize from '../connection/connection.js';

class Country extends orm.Model {};

Country.init({
  name: orm.DataTypes.STRING(50)
}, {
  sequelize,
  modelName: 'Country',
  tableName: 'countries'
});

export default Country;