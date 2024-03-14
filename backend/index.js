const express = require('express')
const path  = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const db = require('./db/mongodb')
const isAuth =require('./middleware/isAuth')

require('dotenv').config();//handle dontenv file that i will create


const app  = express()
const csrfProtection = csrf({cookie:true}) 
db()

const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'views')))

app.use(csrfProtection)
app.use(isAuth.authenticateToken, (req,res,next)=>{
    res.locals.isAuth = req.user;
    res.locals.csrfToken = req.csrfToken()
    next()
})
app.use(userRoutes)
app.use(postRoutes);

const port = 3000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)

})
