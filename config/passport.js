const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bCrypt = require('bcryptjs')
const User = require('../models/users')


module.exports = function(passport){
    passport.use(
        new LocalStrategy(
            {usernameField:'email'},
            (email, password, done) => {
                User.findOne({email:email})
                .then(user => {
                    if(!user) return done(null, false, {message:'email not found please register'})
                    bCrypt.compare(password, user.password, (err, isMatch) => {
                        if(isMatch) return done(null, user)
                        else return done(null, false, {message:'incorrect password'})
                    })
                })
                .catch(err => console.log(err))
            }
        )
    )

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });
      });
}


