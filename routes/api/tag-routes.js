const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags with associated Product data
router.get('/', async (req, res) => {
  try {
    // Find all tags and include associated Product data
    const tagsData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.json(tagsData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET a single tag by its ID with associated Product data
router.get('/:id', async (req, res) => {
  try {
    // Find a single tag by its ID and include associated Product data
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'Tag not found with this id' });
      return;
    }

    res.json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST a new tag
router.post('/', async (req, res) => {
  try {
    // Create a new tag using the request body
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// PUT (update) a tag's name by its ID value
router.put('/:id', async (req, res) => {
  try {
    // Update a tag's name by its ID value with the provided request body
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(updatedTag);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// DELETE a tag by its ID value
router.delete('/:id', async (req, res) => {
  try {
    // Delete a tag by its ID value
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedTag) {
      res.status(404).json({ message: 'Tag not found with this id' });
      return;
    }

    res.status(200).json(deletedTag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
