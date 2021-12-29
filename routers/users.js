const express = require('express')
const router = express.Router()
const User = require('../models/users')
const bCrypt = require('bcryptjs')
//login route
router.get('/login', (req,res) => res.render('login'))

//Register route
router.get('/register', (req,res) => res.render('register'))

//handel register
router.post('/register', (req, res) => {
    //init user values
    const { name, email, password, password2 } = req.body

    //validations
    let errors = [];
    if(!name || !email || !password || !password2)
    errors.push({msg:'please fill all fields'})

    //validate passwords match
    if(password!==password2)
    errors.push({msg:"passwords didn't match"})

    if(password && password.length < 8)
    errors.push({msg:'password should be at least 8 charcters'})

    if(errors.length > 0){
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    }else{
        //check for existing email
        User.findOne({email:email})
        .then(user => {
            if(user){
                errors.push({msg:'Email is already exists'})
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                })
            }else{
                //create new user
                const newUser = new User({
                    name,
                    email,
                    password,
                })
                console.log(newUser)
                //hash password
                bCrypt.genSalt(10, (err, salt) => {
                    if(err) throw err;
                    bCrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash
                    })
                })

                //save user to db
                newUser.save()
                .then(user => res.render('login'))
                .catch(err => console.log(err))

            }
        })
    }
})

module.exports = router