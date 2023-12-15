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

const editJob =async (req, res, next) =>{
    try{
        const {id} = req.params
        const jobDetails = req.body
        // jobDetails.skills[0] = 'java'
        await jobModel.findByIdAndUpdate(id, jobDetails)
        res.json({
            status : 'SUCCESS',
            message : 'details updated successfully'
        })
    }catch(err){
        console.log(err)
        next(err)
    }
}

const filterjob = async (req, res, next) =>{
    try {
        const { skills, position } = req.query;
        console.log(skills)
        console.log(position)
        // const skills = [];
        // const positions = [];
        const searchCriteria = {};

        if (skills.length > 0 || position.length > 0) {
            // Use $or to perform a logical OR operation
            searchCriteria.$or = [];

            if (skills.length > 0) {
                searchCriteria.$or.push({ skills: { $in: skills } });
            }

            if (position.length > 0) {
                searchCriteria.$or.push({ position: { $in: position } });
            }
        }

        // Perform the search using Mongoose
        const filteredJobs = await jobModel.find(searchCriteria);
        res.json({
            status : 'SUCCESS',
            data : filteredJobs
        })
    } catch (err) {
        console.error(err);
        next(err);
    }
}

const jobdiscription = async (req, res, next) =>{
    try{
        const {id} = req.params
        const getDiscription = await jobModel.findOne({_id : id})
        res.json({
            status : 'SUCCESS',
            data : getDiscription,
            message : 'details updated successfully'
        })
    }catch(err){
        console.log(err)
        next(err)
    }
}

module.exports = {
    createJob,
    editJob,
    filterjob,
    jobdiscription
}