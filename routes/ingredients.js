const express = require('express');
const router = express.Router();
const Ingredient = require('../models/Ingredient');
const fs = require('fs');

/**
 * @swagger
 * /ingredients:
 *   get:
 *     tags:
 *       - Ingredients
 *     summary: Finds all ingredients
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: An array of ingredient objects
 */

router.get('/', async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (err) {
    res.json({ error: err.message });
  }
});

/**
 * @swagger
 * /ingredients/{ingredientId}:
 *   get:
 *     tags:
 *       - Ingredients
 *     summary: Finds one ingredient
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "ingredientId"
 *       in: "path"
 *       required: true
 *       type: string
 *     responses:
 *       '200':
 *         description: Returns found ingredient object
 */
router.get('/:ingredientId', async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.ingredientId);
    res.json(ingredient);
  } catch (err) {
    res.json({ error: err.message });
  }
});

/**
 * @swagger
 * /ingredients:
 *   post:
 *     tags:
 *       - Ingredients
 *     summary: Add new ingredient
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       decription: "Ingredient object that needs to be added to database"
 *       schema:
 *         $ref: '#/definitions/Ingredient'
 *     responses:
 *       '200':
 *         description: An array of ingredient objects
 */
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

/**
 * @swagger
 * /ingredients/{ingredientId}:
 *   delete:
 *     tags:
 *       - Ingredients
 *     summary: Deletes specified ingredient
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "ingredientId"
 *       in: "path"
 *       required: true
 *       type: string
 *     responses:
 *       '200':
 *         description: Deletes ingredient
 */
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

/**
 * @swagger
 * /ingredients/{ingredientId}:
 *   patch:
 *     tags:
 *       - Ingredients
 *     summary: Edit ingredient
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "ingredientId"
 *       in: "path"
 *       required: true
 *     - in: "body"
 *       name: "body"
 *       decription: "Object of edited values"
 *       schema:
 *         $ref: '#/definitions/Ingredient'
 *     responses:
 *       '200':
 *         description: Edits specified ingredient
 */
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
