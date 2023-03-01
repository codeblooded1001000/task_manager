const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const { signToken } = require('../middlewares/auth');

const signUp = async (req, res) => {
  const existingUser = await userModel.findOne({ email: req.body.email }); // CHECKS FOR THE EXISTING USER IN OUR DATABASE
  if (existingUser) {
    return res.status(400).json({
      status: 400,
      message: 'Account Already exists',
    });
  }
  try {
    const newUser = new userModel(req.body); // CRETATED NEW INSTANCE OF USER
    const hashedPwd = await bcrypt.hash(req.body.password, 10); // CONFIGURED BCRYPT HASH METHOD TO STORE PASSWORD IN DATABAS EAFTER ENCODING
    newUser.password = hashedPwd;
    newUser.createdAt = new Date();
    let token = signToken(newUser); // CALLING SIGNTOKEN FUNCTION TO HAVE A JWT FOR THIS PARTICULAR USER
    await newUser.save(); // AFTER CREATING THE USER, SAVE THAT USER IN OUR DATABASE
    return res.status(201).json({
      success: true,
      data: {
        userId: newUser.id,
        email: newUser.email,
        token: token,
        createdAt: newUser.createdAt,
      },
    });
  } catch (err) {
    return res.status(500).send('Something Went wrong');
  }
};

/***************************** LOGIN FUNCTION, IF THE USER IS ALREADY PRESENT IN OUR DATABASE ***************************/
const login = async (req, res) => {
  let { email, password } = req.body;
  let existingUser = await userModel.findOne({ email: email }); //CHECKS FOR THE EXISTING USER IN OUR DATABASE
  if (!existingUser) {
    return res.status(404).json({
      status: 404,
      message: 'Wrong email or password',
    });
  }
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      status: 400,
      message: 'Please provide all details i.e. email and password',
    });
  }
  try {
    let token = signToken(existingUser); // CALLING SIGNTOKEN FUNCTION TO HAVE A JWT FOR THIS PARTICULAR USER
    if (existingUser) {
      const cmp = await bcrypt.compare(password, existingUser.password); // CHECKS FOR THE PASSWORD IS THAT IS CORRECT OR NOT BY USING BCRYPT COMPARE METHOD
      if (cmp) {
        return res.status(200).json({
          success: true,
          data: {
            status: 200,
            message: 'User login successful',
            userId: existingUser.id,
            email: existingUser.email,
            token: token,
          },
        });
      } else {
        return res.status(403).json({
          status: 403,
          message: 'Wrong Password',
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'Error! Something went wrong',
    });
  }
};

module.exports = { signUp, login };
