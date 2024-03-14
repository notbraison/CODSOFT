const express = require("express")
const router = express.Router()
const User = require('../db/models/userModel')

router.get('/login', (req,res)=>{
    res.render('login',{error:""})
})

router.post('/login', async (req, res) => {
    try {
        // The 'email' variable should be taken from 'req.body.email', not 'req,res,email'
        const user = await User.loginUser(req.body.email, req.body.password);
        const token = await user.generateAuthTokens();
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/');
    } catch (error) {
        console.error('Login error:', error.message);
        res.render("login", { error: "Wrong password or username" });
    }
});


router.get('/create-account', (req,res)=>{
    res.render('signup',{error:""})
})

router.get('/logout', (req,res)=>{
    res.clearCookie('token')
    res.redirect('/')
})

router.post('/create-account', async (req, res) => {
    try {
        const user = req.body;
        const userExists = await User.find({ email: user.email });
        if (userExists.length === 0) {
            const account = new User({
                name: user.name,
                email: user.email,
                password: user.password
            });
            await account.generateAuthTokens();
            await account.save();
            console.log('Account created successfully');
            res.redirect('/');
        } else {
            console.log('User exists, cannot create account');
            res.render('signup', { error: "User exists" });
        }
    } catch (error) {
        console.error('Error during account creation:', error);
        res.redirect('/login');
    }
});


module.exports = router