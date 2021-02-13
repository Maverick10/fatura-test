var DataTypes = require("sequelize").DataTypes;
var _category = require("./category");
var _product = require("./product");
var _product_provider = require("./product_provider");
var _provider = require("./provider");

function initModels(sequelize) {
  var category = _category(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var product_provider = _product_provider(sequelize, DataTypes);
  var provider = _provider(sequelize, DataTypes);

  product.belongsToMany(provider, { through: product_provider, foreignKey: "product_id", otherKey: "provider_id" });
  provider.belongsToMany(product, { through: product_provider, foreignKey: "provider_id", otherKey: "product_id" });
  category.belongsTo(category, { as: "parent", foreignKey: "parent_id"});
  category.hasMany(category, { as: "categories", foreignKey: "parent_id"});
  product.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasMany(product, { as: "products", foreignKey: "category_id"});
  product_provider.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(product_provider, { as: "product_providers", foreignKey: "product_id"});
  product_provider.belongsTo(provider, { as: "provider", foreignKey: "provider_id"});
  provider.hasMany(product_provider, { as: "product_providers", foreignKey: "provider_id"});

  return {
    category,
    product,
    product_provider,
    provider,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
