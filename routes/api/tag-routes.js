const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
    Tag.findAll({
      include: [{ model: Tag }, { model: Product }, { model: ProductTag }].then((TagData) => {
      
        res.json(TagData);
    })
  });
}
);


router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated tags
  Tag.findByPk({
    include: [{ model: Tag }, { model: Product }, { model: ProductTag },].then((TagData) => {
    res.json(TagData);
  })
});
}
);

router.post('/', (req, res) => {
  // create a new category
  router.post('/', (req, res) => {
    Tag.create(req.body)
      .then((newTag) => {
        res.json(newTag);
      })
      .catch((err) => {
        res.json(err);
      
  });
})
  

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      id:req.body.id,
      product_id: req.body.product_id,

    },
    {
      where: {
        product_id: req.params.product_id,
      },
    }
  )
    .then((updatedTag) => {
      // Sends the updated tag as a json response
      res.json(updatedTag);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  // delete one tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));

  });
})


module.exports = router;
