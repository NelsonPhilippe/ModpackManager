const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

const admin_user = {
  username: 'admin',
  password: 'default'
}

dotenv.config();
const secret_token = process.env.TOKEN;


router.get('/login', (req, res, next) => {
  res.render('login')
})

router.post('/auth', async(req, res) => {

    console.log(req.body)
  const {email, password} = req.body;

  const user = admin_user;


  if(user.password === password && user.username === email){
    const access_token = jwt.sign({ username: email }, secret_token)

    res.cookie('token', access_token, {maxAge: 9000000, httpOnly: true})
    res.redirect('/update')
  }
})

module.exports = router;
