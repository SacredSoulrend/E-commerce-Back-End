// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true, // Auto-incrementing primary key
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false, // Product name is required
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true, // Price must be a decimal number
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10, // Default stock value is 10
      validate: {
        isNumeric: true, // Stock must be a numeric value
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category', // References the 'category' model
        key: 'id', // References the 'id' column in the 'category' model
        unique: false, // Multiple products can belong to the same category
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
