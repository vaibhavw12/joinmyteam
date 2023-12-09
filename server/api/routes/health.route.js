const express = require('express')

const router = express.Router()

router.get('/health', (req, res)=>{
    res.json({
        status : 'SUCCESS',
        message : 'server is up and running'
    })
})

module.exports = router