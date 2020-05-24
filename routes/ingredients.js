const express = require('express');
const router = express.Router();
const Ingredient = require('../models/Ingredient');

router.get('/', async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.get('/:ingredientId', async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.ingredientId);
    res.json(ingredient);
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const ingredient = new Ingredient({
    title: req.body.title,
    description: req.body.description,
    calories: req.body.calories,
  });

  try {
    const savedIngredient = await ingredient.save();
    res.json(savedIngredient);
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.delete('/:ingredientId', async (req, res) => {
  try {
    const removeIngredient = await Ingredient.deleteOne({
      _id: req.params.ingredientId,
    });
    res.json(removeIngredient);
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.patch('/:ingredientId', async (req, res) => {
  try {
    const updateIngredient = await Ingredient.updateOne(
      { _id: req.params.ingredientId },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          calories: req.body.calories,
        },
      }
    );
    res.json(updateIngredient);
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
