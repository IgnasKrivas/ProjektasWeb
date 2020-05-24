const express = require('express');
const router = express.Router();
const Ingredient = require('../models/Ingredient');

router.get('/', async (req, res) => {
    try{
        const ingredients = await Ingredient.find()
        .populate('ingredients');
        res.json(ingredients); 
        console.log( Ingredient.aggregate([
            {
              $group: {
                 _id: null,
                 count: { $sum: 1 }
              }
            }
          ]));
       
    }
    catch(err){
        res.json({message: err});
    }
});


module.exports = router;