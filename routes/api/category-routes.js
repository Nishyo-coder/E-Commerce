// ### Fill Out the API Routes to Perform RESTful CRUD Operations

// Fill out the unfinished routes in `product-routes.js`, `tag-routes.js`, and `category-routes.js` to perform create, read, update, and delete operations using your Sequelize models.

// Note that the functionality for creating the many-to-many relationship for products has already been completed for you.

// > **Hint**: Be sure to look at the mini-project code for syntax help and use your model's column definitions to figure out what `req.body` will be for POST and PUT routes!

const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//   // find all categories
//   // be sure to include its associated Products
router.get('/', async (req, res) => {
  // Store the categoryData in a variable once the promise is resolved.
  const CategoryData = await Category.findAll({
    include: [ { model: Product}],
  });

  // Return the CategoryData promise inside of the JSON response
  return res.json(CategoryData);
});


router.get('/:id', async (req, res) => {
  try {
    const CategoryData = await Category.findByPk(req.params.id, {
      include: [ { model: Product } ],
    });
   
    if (!CategoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.post('/', (req, res) => {
  // create a new category
  router.post('/', (req, res) => {
    Category.create(req.body)
      .then((newCategory) => {
        res.json(newCategory);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.put('/:id', async (req, res) => {
    //Calls the update method on the Book model
    const updatedCategory = await Category.update(
      {
        // All the fields you can update and the data attached to the request body.
        category_name: req.body.category_name,
      },
      {
        // Gets a book based on the book_id given in the request parameters
        where: {
          category_id: req.params.category_id,
        },
      }
    );
    
    res.json(updatedCategory);
  });

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
    Category.destroy({
        where: {
          category_id: req.params.category_id
        },
      })
        .then((deletedCategory) => {
          res.json(deletedCategory);
        })
        .catch((err) => res.json(err));
    });

module.exports = router;
