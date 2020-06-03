const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create new User
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       decription: "User object with passwordCheck"
 *       schema:
 *         $ref: '#/definitions/User'
 *     responses:
 *       '200':
 *         description: An array of recipe objects
 *       '400':
 *         description: Something went wrong, will show error message that explains that went wrong
 */
router.post('/register', async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;

    // validate email, password and display name

    if (!email || !password || !passwordCheck) {
      return res.status(400).json({ msg: 'Not all fields have been entered.' });
    }
    if (password.length < 5) {
      return res
        .status(400)
        .json({ msg: 'Password needs to be atleast 5 characters long' });
    }
    if (password !== passwordCheck) {
      return res
        .status(400)
        .json({ msg: 'Password needs to be typed twice for validation' });
    }

    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ msg: 'This email is already used' });
    }
    const existingDisplayName = await User.findOne({
      displayName: displayName,
    });
    if (existingDisplayName) {
      return res.status(400).json({ msg: 'This display name is already used' });
    }
    if (!displayName) {
      displayName = email;
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Login to the user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       decription: "Object with email and password"
 *       schema:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *            format: email
 *            example: mantas.dranseika@gmail.com
 *          password:
 *            type: string
 *            example: labas
 *     responses:
 *       '200':
 *         description: An array of recipe objects
 *       '400':
 *         description: Something went wrong, will show error message that explains that went wrong
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate

    if (!email || !password) {
      return res.status(400).json({ msg: 'Not all fields have been entered.' });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: 'No user with such email found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.send({
      token,
      user: {
        id: user._id,
        displaName: user.displayName,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /delete:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: "header"
 *       name: "x-auth-token"
 *       decription: "User token"
 *       schema:
 *        type: string
 *       required: true
 *     responses:
 *       '200':
 *         description: Shows deleted user object
 */
router.delete('/delete', auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    if (deletedUser === null) {
      res.status(400).json({ msg: 'User has already been deleted before' });
    } else {
      res.json(deletedUser);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /tokenIsValid:
 *   post:
 *     tags:
 *       - Users
 *     summary: Checks whether provided token is valid
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: "header"
 *       name: "x-auth-token"
 *       decription: "User token"
 *       schema:
 *        type: string
 *       required: true
 *     responses:
 *       '200':
 *         description: Gives true or false
 */
router.post('/tokenIsValid', async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.json(false);
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.json(false);
    }

    const user = await User.findById(verified.id);

    if (!user) {
      return res.json(false);
    }

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /user:
 *   get:
 *     tags:
 *       - Users
 *     summary: Gets logged user data
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: "header"
 *       name: "x-auth-token"
 *       decription: "User token"
 *       schema:
 *        type: string
 *       required: true
 *     responses:
 *       '200':
 *         description: Prints out logged user object
 */
router.get('/user', auth, async (req, res) => {
  try {
    const getUser = await User.findById(req.user);
    res.json({
      displayName: getUser.displayName,
      id: getUser._id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
