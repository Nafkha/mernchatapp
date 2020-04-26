const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

const User = require('../../models/User')

// @route POST api/users/register
// @desc Register user
// @access public

router.post("/register", (req,res) => {

    //Form Validation 

    const {errors, isValid} = validateRegisterInput(req.body)

    if(!isValid){
        return res.status(400).json(errors)
    }

    User.findOne({email: req.body.email}).then(user => {
        if(user){
            return res.status(400).json({Error: "Email Already Registred"})
        }else{
            User.findOne({username: req.body.username}).then(us =>{
                if(us){
                    return res.status(400).json({Error: "Username already exists"})
                }else{
                    const newUser  = new User({
                        username: req.body.username,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        password: req.body.password
                    })
                    bcrypt.genSalt(10, (err, salt) =>{
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            newUser.password = hash
                            newUser.save().then(user => {
                                console.log("User Registred !!!")
                                res.json(user)
                            }).catch(err => console.log(err))
                        })
                    })
                }
            })
        }
    })
})

// @route POST api/users/login
// @desc Login User
// @access public

router.post('/login', (req,res)=>{
    const {errors, isValid} = validateLoginInput(req.body)
    if(!isValid){
        return res.status(400).json(errors)
    }
    const username = req.body.username
    const password = req.body.password

    User.findOne({username}).then(user=>{
        if(!user){
            console.log("USER NOT FOUND")
            return res.status(404).json({Error: "USER NOT FOUND"})
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch){
                const payload = {
                    id: user.id,
                    username: user.username
                }
                const secret = config.get('jwtSecret')
                jwt.sign(payload, secret ,{
                    expiresIn: 7200 //2 heures
                },
                (err,token)=>{
                    res.json({
                        success: true,
                        token: token
                    })
                })
            }else{
                console.log("INCORRECT PASSWORD")
                return res.status(400).json({Error: "Incorrect Password"})
            }
        })
    })
})

module.exports = router