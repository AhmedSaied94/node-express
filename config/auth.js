module.exports = {
    IsAuthenticated : function(req, res, next){
        if(req.isAuthenticated()) next()
        else{
            req.flash('err_msg', 'please login first')
            res.redirect('/users/login')
        }
    }
}