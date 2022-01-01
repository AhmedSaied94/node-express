const express = require('express')
const router = express.Router()
const { IsAuthenticated } = require('../config/auth')

router.get('/', (req, res) => res.render('home', {req}))
router.get('/dashboard', IsAuthenticated, (req,res) => res.render('dashboard', {req}))

module.exports = router