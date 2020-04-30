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

    const email = req.body.email.toUpperCase()
    const username = req.body.username.toUpperCase()

    User.findOne({email}).then(user => {
        if(user){
            const errMsg = req.body.email + " Is already used"
            console.log(errMsg)
            return res.status(400).json({Error: errMsg})
        }else{
            User.findOne({username}).then(us =>{
                if(us){
                    const errMsg = req.body.username + " Is already used"
                    console.log(errMsg)
                    return res.status(400).json({Error: errMsg})
                }else{
                    const newUser  = new User({
                        username: req.body.username.toUpperCase(),
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email.toUpperCase(),
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
    const username = req.body.username.toUpperCase()
    const password = req.body.password

    User.findOne({username}).then(user=>{
        if(!user){
            console.log("USER NOT FOUND")
            return res.status(404).json({Error: "USER NOT FOUND"})
        }
        console.log("USER FOUND")
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
                        token: token,
                        user: {
                            id: user.id,
                            username: user.username,
                            firstname: user.firstname,
                            lastname: user.lastname
                        }
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