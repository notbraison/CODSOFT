const express = require('express')
const path  = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const session = require('express-session');
const csrf = require('csurf')

const db = require('./db/mongodb')
const isAuth =require('./middleware/isAuth')

require('dotenv').config();//handle dontenv file that i will create


const app  = express()
const csrfProtection = csrf({cookie:true}) 
db()



app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'views')))

//app.use(express.json());//Middleware to parse JSON request bodies

// Add session middleware setup before defining routes
app.use(session({
    secret: process.env.SESSION_SECRET, // Secret used to sign the session ID cookie
    resave: false, // Prevents saving the session if it hasn't been modified
    saveUninitialized: false, // Prevents saving uninitialized sessions

    cookie: {
        secure: false, // Ensures cookies are only sent over HTTPS, set to true in production
        maxAge: 24 * 60 * 60 * 1000 // Session expiry time (24 hours)
      }
}));

app.use(csrfProtection)
app.use(isAuth.authenticateToken, (req,res,next)=>{
    res.locals.isAuth = req.user;
    res.locals.csrfToken = req.csrfToken()
    next()
})

const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')

app.use(userRoutes)
app.use(postRoutes);

const port = 3000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)

})


