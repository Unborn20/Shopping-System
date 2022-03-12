'use strict';
import orm from 'sequelize';
import sequelize from '../connection/connection.js';

class Sale extends orm.Model {};

Sale.init({
  totalPrice: orm.DataTypes.DECIMAL(10, 2),
  totalQuantity: orm.DataTypes.INTEGER,
  productId: orm.DataTypes.UUIDV1,
  clientId: orm.DataTypes.UUIDV1
}, {
  sequelize,
  modelName: 'Sale',
  tableName: 'sales'
});

export default Sale;