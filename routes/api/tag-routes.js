const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // Store the tag data in a variable once the promise is resolved.
  const TagData = await Tag.findAll({
    include: [ { model: Product},]
  });

  // Return the Tag data promise inside of the JSON response
  return res.json(TagData);
});

//get one tag
router.get('/:id', async (req, res) => {
  try {
    const TagData = await Tag.findByPk(req.params.id, {
      include: [ { model: Product},]
    });
   
    if (!TagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
    Tag.create({
      tag_name: "Sporting Goods",
})
    .then((newTag) => {
      res.json(newTag)
    })
    .catch((err) => {
      res.json(err);
    });

router.put('/:id', async (req, res) => {
  //Calls the update method on the Book model
  const updatedTag = await Tag.update(
    {
      // All the fields you can update and the data attached to the request body.
      tag_name: req.body.tag_name,
      
    },
    {
      // Gets a tag based on the id given in the request parameters
      where: {
        id: req.params.id,

      },
    }
  );
  
  res.json(updatedTag);
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
