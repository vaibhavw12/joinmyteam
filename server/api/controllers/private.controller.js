const jobModel = require('../models/job.models.js')

const createJob =async (req, res, next) =>{
    try{
        const jobDetails = req.body
        // jobDetails.name = 'something'
        console.log(jobDetails)
        await jobModel.create(jobDetails)
        res.json({
            status : 'SUCCESS',
            message : 'details added successfully'
        })
    }catch(err){
        console.log(err)
        next(err)
    }
}

module.exports = {
    createJob
}