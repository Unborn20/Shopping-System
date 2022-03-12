import Role from './role.js';
import User from './user.js';
import ImageProduct from './image_product.js';
import Country from './country.js';
import City from './city.js';
import Client from './client.js';
import Product from './product.js';
import Sale from './sale.js';

Role.hasMany(User, {foreignKey:'roleId'});
User.belongsTo(Role, {foreignKey:'roleId'});

User.hasMany(Product, {foreignKey:'userId'});
Product.belongsTo(User, {foreignKey:'userId'});

ImageProduct.hasOne(Product, {foreignKey:'imageProductId'});
Product.belongsTo(ImageProduct, {foreignKey:'imageProductId'});

Country.hasMany(City, {foreignKey:'countryId'});
City.belongsTo(Country, {foreignKey:'countryId'});

User.hasOne(Client, {foreignKey:'userId'});
Client.belongsTo(User, {foreignKey:'userId'});

Country.hasOne(Client, {foreignKey:'countryId'});
Client.belongsTo(Country, {foreignKey:'countryId',});

City.hasOne(Client, {foreignKey:'cityId'});
Client.belongsTo(City, {foreignKey:'cityId'});

Client.belongsToMany(Product, {through: 'sales'});
Product.belongsToMany(Client, {through: 'sales'});

Sale.belongsTo(Client, {foreignKey:'clientId'});
Sale.belongsTo(Product, {foreignKey:'productId'});