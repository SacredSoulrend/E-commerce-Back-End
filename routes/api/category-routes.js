const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories with associated products
router.get('/', async (req, res) => {
  try {
    // Find all categories and include associated products
    const categoriesData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.json(categoriesData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET a single category by ID with associated products
router.get('/:id', async (req, res) => {
  try {
    // Find a category by its ID and include associated products
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'Category not found with this id' });
      return;
    }

    res.json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST a new category
router.post('/', async (req, res) => {
  try {
    // Create a new category using the request body
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// PUT (update) a category by ID
router.put('/:id', async (req, res) => {
  try {
    // Update a category by its ID with the provided request body
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (updatedCategory[0] === 0) {
      res.status(404).json({ message: 'Category not found with this id' });
      return;
    }

    res.status(200).json(updatedCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE a category by ID
router.delete('/:id', async (req, res) => {
  try {
    // Delete a category by its ID
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedCategory) {
      res.status(404).json({ message: 'Category not found with this id' });
      return;
    }

    res.status(200).json(deletedCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;

