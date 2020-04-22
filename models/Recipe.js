const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    calories: {
        type: Number,
        require: true
    },
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient'
    }]
});


module.exports = mongoose.model('Recipe', RecipeSchema);