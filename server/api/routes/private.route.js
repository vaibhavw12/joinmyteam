const express = require('express')
const privateControllers = require('../controllers/private.controller.js')
const jwt = require('jsonwebtoken')
const router = express.Router()

// middleware to checked for user authorization
const loggedIn = (req, res, next)=>{
    try{
        const {jwttoken} = req.headers
        const user = jwt.verify(jwttoken, process.env.PrivateKey)
        console.log(user)
        next()
    }catch(err){
        console.log(err)
        next(err)
    }
}

router.post('/createjob', loggedIn, privateControllers.createJob)

module.exports = router