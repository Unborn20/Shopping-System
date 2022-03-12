'use strict';
import orm from 'sequelize';
import sequelize from '../connection/connection.js';

class Client extends orm.Model {};

Client.init({
  address: orm.DataTypes.STRING(100),
  cardNumber: orm.DataTypes.STRING(16),
  cvv: orm.DataTypes.STRING(3),
  userId: orm.DataTypes.UUID,
  countryId: orm.DataTypes.INTEGER,
  cityId: orm.DataTypes.UUID
}, {
  sequelize,
  modelName: 'Client',
  tableName: 'clients'
});

export default Client;