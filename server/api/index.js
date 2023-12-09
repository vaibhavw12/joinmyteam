const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')

const healthRoutes = require('./routes/health.route.js')
const authRoutes = require('./routes/auth.route.js')

dotenv.config()
const app = express()
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT || 5000;
const url = process.env.MONGO_URL

app.listen(port, () => {
    mongoose.connect(url)
    .then(()=>{
        console.log(`Server running on port ${port} 🔥 and DB successfully connected`)
    })
    .catch((err)=>{
        console.log(err)
    })
});

app.use('/api', healthRoutes)
app.use('/api/auth', authRoutes)