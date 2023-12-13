const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')

const healthRoutes = require('./routes/health.route.js')
const authRoutes = require('./routes/auth.route.js')
const privateRoutes = require('./routes/private.route.js')

dotenv.config()
const app = express()
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT || 5000;
const url = process.env.MONGO_URL

app.use('/api', healthRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/auth/profile', privateRoutes)

// route not found middleware
app.use((req, res, next)=>{
    const err = new Error('route not found')
    err.status = 404
    next(err)
})

// can handel any custom error -> error handler middleware
app.use((err, req, res, next)=>{
    res.json({
        status : err.status || 500,
        message : err.message
    })
})

app.listen(port, () => {
    mongoose.connect(url)
    .then(()=>{
        console.log(`Server running on port ${port} 🔥 and DB successfully connected`)
    })
    .catch((err)=>{
        console.log(err)
    })
});

