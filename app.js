const fs = require('fs')
const path = require('path');
const url = require('url')
const http = require('http')
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')


//connect db

const db = require('./config/keys').MongoURI
mongoose.connect(db, { useNewUrlParser:true, useUnifiedTopology: true })
.then(() => console.log('connected to mongodb'))
.catch(err => console.log(err))

//implement ejs as middleware
app.use(expressLayouts)
app.set('view engine', 'ejs');

//body parser
app.use(express.urlencoded({extended:false}))

//connect express-session
app.use(session({
  secret: 'session',
  resave: true,
  saveUninitialized: true,
}))

//connect flash
app.use(flash())

//flash_msgs_global_vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.err_msg = req.flash('err_msg')
    next()
})

//home route
app.use('/', require('./routers/index'))

//users routes
app.use('/users', require('./routers/users'))



// app.use(express.static(path.join(__dirname, 'pages')))

// const server = http.createServer((req, res) => {
//     let filePath = path.join(__dirname, 'pages', req.url==="/" ? "home.html" : req.url)
//     let fileExt = path.extname(filePath)
//     let contentType = 'text/html'
//     switch(fileExt){
//         case ".js":
//             contentType = 'text/javascript';
//             break;
//         case ".css":
//             contentType = 'text/css';
//             break;
//         case ".png":
//             contentType = 'image/png';
//             break;
//         case ".jpg":
//             contentType = 'image/jpg';
//             break;
//         case ".json":
//             contentType = 'application/json';
//             break;
//     }

//     fs.readFile(filePath, 'utf8', (err, content) => {
//         if(err){
//             if(err.code=='ENOENT'){
//                 fs.readFile(path.join(__dirname, "pages", "404.html"), "utf8", (err, content) => {
//                     res.writeHead(404, {'Content-Type':'text/html'})
//                     res.end(content)
//                 })
//             }else{
//                 res.writeHead(500, {'Content-Type':'text/html'})
//                 res.end(`<h1>Internal Server Error ${err.code}</h1>`)
//             }
//         }else{
//             fs.readFile(filePath, "utf8", (err, content) => {
//                 res.writeHead(200, {'Content-Type':contentType})
//                 res.end(content)
//             })
//         }
//     })

// });

const PORT = process.env.PORT || 5000;

// server.listen(PORT, () => console.log(`server running on port ${PORT}`))
app.listen(PORT, ()=> console.log('server is running on port '+PORT))