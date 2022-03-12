'use strict';
import orm from 'sequelize';
import sequelize from '../connection/connection.js';

class Product extends orm.Model {};

Product.init({
  name: orm.DataTypes.STRING(50),
  price: orm.DataTypes.DECIMAL(10, 2),
  quantity: orm.DataTypes.INTEGER,
  state: orm.DataTypes.BOOLEAN,
  userId: orm.DataTypes.UUID,
  imageProductId: orm.DataTypes.UUID
}, {
  sequelize,
  modelName: 'Product',
  tableName: 'products'
});

export default Product;