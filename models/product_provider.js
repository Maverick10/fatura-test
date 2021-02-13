const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_provider', {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    provider_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'provider',
        key: 'id'
      }
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    is_available: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'product_provider',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "product_id" },
          { name: "provider_id" },
        ]
      },
      {
        name: "product_provider_FK_1",
        using: "BTREE",
        fields: [
          { name: "provider_id" },
        ]
      },
    ]
  });
};
