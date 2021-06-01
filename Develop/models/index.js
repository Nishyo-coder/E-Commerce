// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// ### Associations

// You'll need to execute association methods on your Sequelize models to create the following relationships between them:

// * `Product` belongs to `Category`, and `Category` has many `Product` models, 
// as a category can have multiple products but a product can only belong to one category.

// * `Product` belongs to many `Tag` models, and `Tag` belongs to many `Product` models. 
// Allow products to have multiple tags and tags to have many products by using the `ProductTag` through model.

// > **Hint:** Make sure you set up foreign key relationships that match the column we created in the respective models.


// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
});

// Allow products to have multiple tags and tags to have many products by using the `ProductTag` through model.

// Products belongToMany Tags (through ProductTag)

Product.belongsToMany(Tag, {

  through: {
    model: ProductTag,
    foreignKey: 'product_id, tag_id',
  },
}),

// Tags belongToMany Products (through ProductTag)

Tag.belongsToMany(Product, {

  through: {
    model: ProductTag,
    foreignKey: 'product_id, tag_id',
  },
}),

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

// traveller.belongsToMany(Location, {
//   // Define the third table needed to store the foreign keys
//   through: {
//     model: Trip,
//     unique: false
//   },

// const Driver = require('./Driver');
// const License = require('./License');
// const Car = require('./Car');

// Driver.hasOne(License, {
//   foreignKey: 'driver_id',
//   onDelete: 'CASCADE',
// });

// License.belongsTo(Driver, {
//   foreignKey: 'driver_id',
// });

// //if you delete the driver, delete the cars cascade delete)
// Driver.hasMany(Car, {
//   foreignKey: 'driver_id',
//   onDelete: 'CASCADE',
// });

// Car.belongsTo(Driver, {
//   foreignKey: 'driver_id',
// });