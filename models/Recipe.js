const mongoose = require('mongoose');

/**
 * @swagger
 * definitions:
 *   Recipe:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *         example: Obuoliu pyragas
 *       description:
 *         type: string
 *         example: Labai skanus receptas
 *       calories:
 *         type: integer
 *         example: 200
 *       ingredients:
 *         type: array
 *         example: ["5ed7adab7ef17c07d8827a77", "5ed3b4cb95497202e3498f23"]
 */

const RecipeSchema = mongoose.Schema({
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
  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient',
    },
  ],
});

module.exports = mongoose.model('Recipe', RecipeSchema);
