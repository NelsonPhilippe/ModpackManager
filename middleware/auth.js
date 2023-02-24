const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();
const secret_token = process.env.TOKEN;


module.exports = (req, res, next) => {

    try{

        const token = req.cookies.token
        jwt.verify(token, secret_token)
        next()
    }catch {
        res.status(401).redirect('/users/login')
    }
}