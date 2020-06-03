const mongoose = require('mongoose');

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *         format: email
 *         example: mantas.dranseika@gmail.com
 *       password:
 *         type: string
 *         example: labas
 *       passwordCheck:
 *         type: string
 *         example: labas
 *       displayName:
 *         type: string
 *         example: Mantas
 */
const UserSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    minlength: 5,
  },
  displayName: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model('User', UserSchema);
