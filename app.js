const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: '1.0.0',
      title: 'Health API',
      description: 'Health API information',
      contact: {
        name: 'Developer',
      },
      servers: ['http://localhost:8080'],
    },
  },
  // ['.routes/*.js']
  apis: ['app.js', './routes/*.js', './models/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
