const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const fs = require('fs');



dotenv.config();
const secret_token = process.env.TOKEN;


router.get('/login', (req, res, next) => {
  res.render('login')
})

router.post('/auth', async(req, res) => {

    console.log(req.body)
  const {email, password} = req.body;
    const user = {
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD
  };


  if(user.password === password && user.username === email){
    const access_token = jwt.sign({ username: email }, secret_token)

    res.cookie('token', access_token, {maxAge: 9000000, httpOnly: true})
    res.redirect('/update')
  }
})

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({message: 'Logged out'})
});

router.post('/update', (req, res) => {
    const {username, password} = req.body;

    fs.writeFileSync('.env', `ADMIN_USERNAME=${username}\nADMIN_PASSWORD=${password}\nTOKEN=${process.env.TOKEN}`);

    res.status(200).json({message: 'Updated'})
});
module.exports = router;
