// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id', // Foreign key linking Products to Category
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id', // Foreign key linking Categories to Products
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag, // Defines the intermediate table
  foreignKey: 'product_id', // Foreign key linking Products to Tags
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag, // Defines the intermediate table
  foreignKey: 'tag_id', // Foreign key linking Tags to Products
});


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
