const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../models/Users');

const router = express.Router();
const saltRounds = 10;

router.get('/signup', (req, res) => {
  res.render('public/signup');
});