const jwt = require('jsonwebtoken');
const users = require('../db/users.json');
require('dotenv').config();

const generateToken = user => jwt.sign(user, process.env.JWT_SECRET, {expiresIn: "30m"});

const login = (req, res) => {
    const {username,password} = req.body;

    const foundUser = users.find(u => u.username === username && u.password === password);

    if(!foundUser){
        return res.status(400).send('Username or Password wrong');
    }
 
    const token = generateToken({username,password});
    res.json({token});
}

const authCheck = (req, res, next) => {
    const {authorization} = req.headers
    const token = authorization.split(" ")[1];
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err){
            return res.status(400).send('Token Error');
        }
        next();
    })
    
}

module.exports = {
    login,
    authCheck,
}