const mongoose = require('mongoose');

/**
 * @swagger
 * definitions:
 *   Ingredient:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *         example: Obuolys
 *       description:
 *         type: string
 *         example: Labai skanus vaisius
 *       calories:
 *         type: integer
 *         example: 40
 */
const IngredientSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  calories: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model('Ingredient', IngredientSchema);
