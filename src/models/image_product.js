'use strict';
import orm from 'sequelize';
import sequelize from '../connection/connection.js';

class ImageProduct extends orm.Model {};

ImageProduct.init({
  imageUrl: orm.DataTypes.STRING
}, {
  sequelize,
  modelName: 'ImageProduct',
  tableName: 'image_products'
});

export default ImageProduct;