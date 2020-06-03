const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

/**
 * @swagger
 * /recipes:
 *   get:
 *     tags:
 *       - Recipes
 *     summary: Finds all recipes
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: An array of recipe objects
 */

router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('ingredients');
    res.json(recipes);
  } catch (err) {
    res.json({ error: err.message });
  }
});

/**
 * @swagger
 * /recipes/{recipeId}:
 *   get:
 *     tags:
 *       - Recipes
 *     summary: Finds one ingredient
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "recipeId"
 *       in: "path"
 *       required: true
 *       type: string
 *     responses:
 *       '200':
 *         description: Returns found recipe object
 */
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

/**
 * @swagger
 * /recipes:
 *   post:
 *     tags:
 *       - Recipes
 *     summary: Add new recipe
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       decription: "Recipe object that needs to be added to database"
 *       schema:
 *         $ref: '#/definitions/Recipe'
 *     responses:
 *       '200':
 *         description: An array of recipe objects
 */
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

/**
 * @swagger
 * /recipes/{recipeId}:
 *   delete:
 *     tags:
 *       - Recipes
 *     summary: Deletes specified recipe
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "recipeId"
 *       in: "path"
 *       required: true
 *       type: string
 *     responses:
 *       '200':
 *         description: Deletes recipe
 */
router.delete('/:recipeId', async (req, res) => {
  try {
    const removeRecipe = await Recipe.deleteOne({ _id: req.params.recipeId });
    res.json(removeRecipe);
  } catch (err) {
    res.json({ error: err.message });
  }
});

/**
 * @swagger
 * /recipes/{recipeId}:
 *   patch:
 *     tags:
 *       - Recipes
 *     summary: Edit recipe
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "recipeId"
 *       in: "path"
 *       required: true
 *     - in: "body"
 *       name: "body"
 *       decription: "Object of edited values"
 *       schema:
 *         $ref: '#/definitions/Recipe'
 *     responses:
 *       '200':
 *         description: Edits specified recipe
 */
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
