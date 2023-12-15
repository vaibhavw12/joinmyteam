const userModel = require('../models/user.models.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const register = async (req, res, next)=>{
    const {name, email, mobile, password} = req.body
    const hashedPassword = bcrypt.hashSync(password, 12)
    try{
        await userModel.create({name, email, mobile, password : hashedPassword})
        const currentUser = await userModel.findOne({email})
        const jwtToken = jwt.sign(currentUser.toJSON(),process.env.PrivateKey,{expiresIn : 60*60})
        res.json({
            status : 'SUCCESS',
            name : name,
            message : 'user register successfully',
            token : jwtToken
        })
    }catch(err){
        // console.log(err)
        next(err)
        // res.json({
        //     status : 'FAILED',
        //     message : err.message
        // })
    }
}

const login = async (req, res)=>{
    const {email, password} = req.body
    try{
        const currentUser = await userModel.findOne({email})
        if(currentUser){
            const decryptPassword = bcrypt.compareSync(password, currentUser.password)
            if(decryptPassword){
                const jwtToken = jwt.sign(currentUser.toJSON(),process.env.PrivateKey,{expiresIn : 60*60})
                res.json({
                    status : 'SUCCESS',
                    name : currentUser.name,
                    message : 'login successfull',
                    token : jwtToken
                })
            }else{
                res.json({
                    status : 'FAILED',
                    message : 'email and password does not matched'
                })
            }
        }else{
            res.json({
                status : 'FAILED',
                message : 'user not found with this email'
            })
        }
    }catch(err){
        console.log(err)
        res.json({
            status : 'FAILED',
            message : err.message
        })
    }
}

module.exports = {
    register,
    login
};