const User = require('../models/user');
const jwt = require('jsonwebtoken')
const {normalizeErrors} = require('../helpers/mongoose');  //destructuring
const config = require('../config/dev')

exports.auth = function (req, res) {
    const {email, password} = req.body;

    if (!password || !email) {
        return res.status(422).send({errors: [{title: 'Missing Parameters', detail:"Password and email is required to log in"}]})
    }

    User.findOne({email}, (err, user)=>{
        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)})
        }

        if(!user) {
            return res.status(422).send({errors: [{title:"Invalid user", detail:"User does not exists"}]});
        }

        if (user.hasSamePassword(password)) {
            const token = jwt.sign({
                userId: user.id,
                username: user.username
            }, config.SECRET, {expiresIn: '1h'}) 

            return res.json(token) 
        }
        else {
            return res.status(422).send({errors: [{title: "Wrong credentials", detail: "Credentials do not match our records"}]})
        }
    })
}

exports.register = function(req, res) {
    // const username = req.body.username; repeat each or execute as below
    const { username, email, password, passwordConfirmation} = req.body;

    if (!password || !email) {
        return res.status(422).send({errors: [{title: "Missing parameters", detail:"Password and email is required"}]})
    }

    if (password !== passwordConfirmation) {
        return res.status(422).send({errors: [{title: "Password Mismatch", detail: "A password mismatch was detected"}]})
    }
    // if keyword is the same as value not necessary to repeat i.e email: email
    User.findOne({email}, (err, existingUser)=>{
        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)})
        }

        if (existingUser) {
            return res.status(422).send({errors: [{title: "Invalid Email", detail: "User with the above email already exists"}]})
        }

        const user = new User({
            username,
            email,
            password
        })

        user.save((err)=>{
            if (err) {
                return res.status(422).send({errors: normalizeErrors(err.errors)})
            }

            return res.json({'Registered': true})
        })
    })

    // res.json({username, email})
}


exports.authMiddleware = function (req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        const user = parseToken(token);

        User.findById(user.userId, (err, user)=>{
            if (err) {
                return res.status(422).send({errors: normalizeErrors(err.errors)})
            }

            if (user) {
                res.locals.user = user;
                next();
            } else {
                return notAuthorized(res)
            }
        })
    } else {
        return notAuthorized(res)
    }
}

function parseToken(token) {
    return jwt.verify(token.split(' ')[1], config.SECRET)
}

function notAuthorized(res) {
    return res.status(401).send({errors: [{title: 'Not Authorized', detail: 'Warning, login required'}]})
}