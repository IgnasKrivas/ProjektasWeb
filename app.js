const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

mongoose.connect('mongodb+srv://Projektas:123@projektas-ebzvm.mongodb.net/test',
{useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.once('open', () => console.log('MongoDB connected successfully'));

const ingredientsRoute = require('./routes/ingredients');
const recipesRoute = require('./routes/recipes');

app.use('/ingredients', ingredientsRoute);
app.use('/recipes', recipesRoute);

app.listen(8080, () => console.log('Server is listening on 8080'));


