const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
const app = express()

app.get('/health', (req, res)=>{
    res.json({
        status : 'SUCCESS',
        message : 'server is up and running'
    })
})

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