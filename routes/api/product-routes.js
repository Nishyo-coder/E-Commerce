const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // Store the ProductData in a variable once the promise is resolved.
  const ProductData = await Product.findAll({
    include: [ { model: Category }, { model: Tag } ],
  });

  // Return the ProductData promise inside of the JSON response
  return res.json(ProductData);
});

router.get('/:id', async (req, res) => {
  try {
    const ProductData = await Product.findByPk(req.params.id, {
      include: [ { model: Category }, { model: Tag } ],
    });
   
    if (!ProductData) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }

    res.status(200).json(ProductData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', (req, res) => {
Product.create({
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]

})
    .then((newProduct) => {
      res.json(newProduct)
    })
    .catch((err) => {
      res.json(err);
    });
    // */

    Product.bulkCreate(req.body)
      .then((product) => {
        // if there's product tags, we need to create pairings to bulk create in the ProductTag model
        if (req.body.tagIds.length) {
          const productTagIdArr = req.body.tagIds.map((tag_id) => {
            return {
              product_id: product.id,
              tag_id,
            };
          });
          return ProductTag.bulkCreate(productTagIdArr);
        }
        // if no product tags, just respond
        res.status(200).json(product);
      })
    //   .then((productTagIds) => res.status(200).json(productTagIds))
    // .catch((err) => {
    //   console.log(err);
    //   res.status(400).json(err);
    // });
});

// // update product
// router.put('/:id', (req, res) => {
//   // update product data
//   Product.update(
//     {
//     product_name: req.body.product_name,
//     price: req.body.price,
//     stock: req.body.stock,
//     category_id: req.body.category_id, 
//   },
//   {
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((product) => {
//       res.json(product)
//       // find all associated tags from ProductTag
//       // return ProductTag.findAll({ where: { product_id: req.params.id } });
//     })
//     .then((productTags) => {
//       // get list of current tag_ids
//       const productTagIds = productTags.map(({ tag_id }) => tag_id);
//       // create filtered list of new tag_ids
//       const newProductTags = req.body.tagIds
//         .filter((tag_id) => !productTagIds.includes(tag_id))
//         .map((tag_id) => {
//           return {
//             product_id: req.params.id,
//             tag_id,
//           };
//         });
//       // figure out which ones to remove
//       const productTagsToRemove = productTags
//         .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
//         .map(({ id }) => id);

//       // run both actions
//       return Promise.all([
//         ProductTag.destroy({ where: { id: productTagsToRemove } }),
//         ProductTag.bulkCreate(newProductTags),
//       ]);
//     })
//     .then((updatedProductTags) => res.json(updatedProductTags))
//     .catch((err) => {
//       // console.log(err);
//       res.status(400).json(err);
//     });
// });

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
    Product.destroy({
        where: {
          category_id: req.params.category_id,
          product_id: req.params.product_id
        },
      })
        .then((deletedCategory) => {
          res.json(deletedCategory);
        })
        .catch((err) => res.json(err));
    });

module.exports = router;
