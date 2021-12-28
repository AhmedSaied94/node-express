const express = require('express')
const router = express.Router()

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
        res.send('pass')
    }
})

module.exports = router