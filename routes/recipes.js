const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('ingredients');
    res.json(recipes);
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.get('/:recipeId', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId).populate(
      'ingredients'
    );
    res.json(recipe);
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const recipe = new Recipe({
    title: req.body.title,
    description: req.body.description,
    calories: req.body.calories,
    ingredients: req.body.ingredients,
  });

  try {
    const savedRecipe = await recipe.save();
    res.json(savedRecipe);
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.delete('/:recipeId', async (req, res) => {
  try {
    const removeRecipe = await Recipe.deleteOne({ _id: req.params.recipeId });
    res.json(removeRecipe);
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.patch('/:recipeId', async (req, res) => {
  try {
    const updateRecipe = await Recipe.updateOne(
      { _id: req.params.recipeId },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          calories: req.body.calories,
          ingredients: req.body.ingredients,
        },
      }
    );
    res.json(updateRecipe);
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
