const express = require('express')
const privateControllers = require('../controllers/private.controller.js')
const jwt = require('jsonwebtoken')
const router = express.Router()

// middleware to checked for user authorization
const loggedIn = (req, res, next)=>{
    try{
        const {jwttoken} = req.headers
        const user = jwt.verify(jwttoken, process.env.PrivateKey)
        // console.log(user)
        next()
    }catch(err){
        // console.log(err.message)
        next(err)
    }
}

router.post('/createjob', loggedIn, privateControllers.createJob)
router.patch('/editjob/:id', loggedIn, privateControllers.editJob)
router.get('/filterjob', privateControllers.filterjob)
router.get('/filterjobByuser',loggedIn, privateControllers.filterjobByuser)
router.get('/jobdiscription/:id', privateControllers.jobdiscription)

module.exports = router