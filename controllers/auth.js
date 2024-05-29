const jwt = require('jsonwebtoken');
const users = require('../db/users.json');
require('dotenv').config();

const generateToken = user => jwt.sign(user, process.env.JWT_SECRET, {expiresIn: "1m"});

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
    if(!authorization){
        return res.status(400).send('Error: No Authorization provided');
    }
    const token = authorization.split(" ")[1];
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err){
            res.format({
                json: () => {
                    let errorObj = {
                        error: true,
                        status: 400,
                        message: ""
                    }
                    switch(err.message){
                        case "invalid token":
                            errorObj.message = `The token is invalid, login to generate a proper token at ${req.baseUrl}/login`;
                            return res.status(400).json(errorObj);
                        case "jwt expired":
                            errorObj.message = `The token expired at ${err.expiredAt}`;
                            return res.status(400).json(errorObj);
                    }
                },
                html: () => {
                    if(err.message === "invalid token"){
                        return res.status(400).send(`The token is invalid, login to generate a proper token at ${req.baseUrl}/login`);
                    }
                    return res.status(400).send(`The token expired at ${err.expiredAt}`);
                }
            })
        }
        next();
    })
    
}

module.exports = {
    login,
    authCheck,
}