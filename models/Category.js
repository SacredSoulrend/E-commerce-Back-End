const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // Define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,          // Doesn't allow null values
      primaryKey: true,          // Defines it as the primary key
      autoIncrement: true,       // Auto-increment the value
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,          // Doesn't allow null values
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
