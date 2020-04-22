const mongoose = require('mongoose');


const IngredientSchema = mongoose.Schema({
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
    }
});

module.exports = mongoose.model('Ingredient', IngredientSchema);