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
        // console.log(req.query)
        console.log('hello')
        const { skills, position } = req.query;
        // console.log(skills)
        // console.log(position)
        // res.json({
        //     status : 'SUCCESS'
        // })
        // const skills = [];
        // const positions = [];
        const searchCriteria = {};

        if ((skills?.length ?? 0) > 0 || (position?.length ?? 0) > 0) {
            searchCriteria.$or = [];
          
            if (skills?.length > 0) {
              searchCriteria.$or.push({ skills: { $in: skills } });
            }
          
            if (position?.length > 0) {
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

const filterjobByuser = async (req, res, next) =>{
    try {
        console.log("filterjobByuser")
        
        const { skills, position, name} = req.query;
        console.log('okay')
        // console.log(skills)
        // console.log(position)
        // res.json({
        //     status : 'SUCCESS'
        // })
        // const skills = [];
        // const positions = [];
        
        // const searchCriteria = {};
        const baseFilter = { name };

        const additionalFilter = {};

        if ((skills?.length ?? 0) > 0 || (position?.length ?? 0) > 0) {
            additionalFilter.$or = [];
          
            if (skills?.length > 0) {
                additionalFilter.$or.push({ skills: { $in: skills } });
            }
          
            if (position?.length > 0) {
                additionalFilter.$or.push({ position: { $in: position } });
            }
          }

        // Perform the search using Mongoose
        // const filteredJobs = await jobModel.find(searchCriteria);
        const combinedFilter = { ...baseFilter, ...additionalFilter };

        const filteredJobs = await jobModel.find(combinedFilter);
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
    jobdiscription,
    filterjobByuser
}