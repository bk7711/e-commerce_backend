const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes:['tag_name'],
    include:[
      {
        model: Product,
        attributes: ['tag_id']
      },
      {
        model: ProductTag,
        attributes: ['tag_id']
      }
    ]
  })
  .then(dbProductData => res.json(dbProductData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where:{
        id:req.params.id
    },
    attributes:['tag_name'],
    include:[
      {
        model: Product,
        attributes: ['tag_id']
      },
      {
        model: ProductTag,
        attributes: ['tag_id']
      }
    ]
})
.then(dbTagData => {
    if(!dbTagData){
        res.status(404).json({ message: 'No Tag found with this id'});
        return;
    }
    res.json(dbTagData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

// create a new tag
router.Tag('/', (req, res) => {
  
  Tag.create({
    Tag_name: req.body.Tag_name
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
    Tag.update(
      {
        Tag_name: req.body.Tag_name
      },
      {
        where:{
          id: req.params.id
        }
      }
    )
    .then(dbTagData => {
      if(!dbTagData){
        res.status(404).json({ messge: 'No Tag found by that id'});
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
    Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(dbTagData => {
      if(!dbTagData){
        res.status(404).json({ message: 'No Tag found by that id'})
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
