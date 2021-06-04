// ### Fill Out the API Routes to Perform RESTful CRUD Operations

// Fill out the unfinished routes in `product-routes.js`, `tag-routes.js`, and `category-routes.js` to perform create, read, update, and delete operations using your Sequelize models.

// Note that the functionality for creating the many-to-many relationship for products has already been completed for you.

// > **Hint**: Be sure to look at the mini-project code for syntax help and use your model's column definitions to figure out what `req.body` will be for POST and PUT routes!

const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
    // Get all books from the book table
    Category.findAll({
      include: [{ model: Category }, { model: Product }].then((CategoryData) => {
      
        res.json(CategoryData);
    })
  });
}
);

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id).then((CategoryData) => {
    res.json(CategoryData);
  });
});

router.post('/', (req, res) => {
  // create a new category
  router.post('/', (req, res) => {
    Category.create(req.body)
      .then((newCategory) => {
        res.json(newCategory);
      })
      .catch((err) => {
        res.json(err);
      });

router.put('/:id', (req, res) => {
  // update a category by its `id` value
    Category.update(
      {
        // All the fields you can update and the data attached to the request body.
        category_name: req.body.category_name,
        id: req.body.id,
      },

      {
        // Gets the category based on the id given in the request parameters
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedCategory) => {
        // Sends the updated category as a json response
        res.json(updatedCategory);
      })
      .catch((err) => res.json(err));
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
    Category.destroy({
        where: {
          id: req.params.id
        },
      })
        .then((deletedCategory) => {
          res.json(deletedCategory);
        })
        .catch((err) => res.json(err));
    });
})

module.exports = router;
