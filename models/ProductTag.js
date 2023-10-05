const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class ProductTag extends Model {}

ProductTag.init(
  {
    // Define columns here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true, // Auto-incrementing primary key
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product', // References the 'product' model
        key: 'id', // References the 'id' column in the 'product' model
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tag', // References the 'tag' model
        key: 'id', // References the 'id' column in the 'tag' model
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
