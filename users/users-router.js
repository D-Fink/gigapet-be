const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('./users-model.js');
const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets.js')

router.post('/register', (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    User.addUser(user)
    .then(user => {
        res.status(201).json(user)  
    })
    .catch(err => {
        res.status(500).json({message: `${err}`})
    })
})

router.post('/login', (req, res) => {
    let {username, password} = req.body;

    User.findUserBy({username})
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)){
            const token = signToken(user)
            res.status(200).json(token)
        } else {
            res.status(401).json({message: 'Invalid Credentials'})
        }
    })
    .catch(err => {
        res.status(500).json({message: `${err}`})
    })
})

function signToken(user) {
    const payload = {
        userId: user.id,
        username: user.username,
        iat: Date.now()
    };

    const options = {
        expiresIn: '1d'
    };

    return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router