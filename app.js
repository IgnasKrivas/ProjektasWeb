const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
/*
mongoose.connect('mongodb+srv://Projektas:123@projektas-ebzvm.mongodb.net/test',
{useNewUrlParser: true, useUnifiedTopology: true});
*/

function connect() {
  mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  /*
  mongoose.connection.once('open', () =>
    console.log('MongoDB connected successfully')
  );
*/
}

function close() {
  return mongoose.disconnect();
}

function startListening() {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
}

const ingredientsRoute = require('./routes/ingredients');
const recipesRoute = require('./routes/recipes');
const usersRoute = require('./routes/usersRoute');
const testingRoute = require('./routes/testing');

app.use('/ingredients', ingredientsRoute);
app.use('/recipes', recipesRoute);
app.use('/', usersRoute);
app.use('/testing', testingRoute);

connect();
startListening();

module.exports = { close, connect, startListening };
