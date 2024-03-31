const express = require("express");
const router = express.Router();
const User = require('../db/models/userModel');
const Post = require('../db/models/postModel')
const isAuth = require('../middleware/isAuth')


router.get('/login', (req, res) => {
    res.render('login', { error: "" });
});


router.post('/login', async (req, res) => {
    try {
        const user = await User.loginUser(req.body.email, req.body.password);
        const token = await user.generateAuthTokens();
        //console.log('Generated token:', token); //working
        // Store user ID in session
        req.session.userId = user._id;
        //console.log(req.session.userId); // Log the user ID stored in the session -it is working fine

        
        
        // Store authentication token in cookie
        res.cookie('token', token, { httpOnly: true });
        
        res.redirect('/');
    } catch (error) {
        console.error('Login error:', error.message);
        res.render("login", { error: "Wrong password or username" });
    }
});


router.get('/create-account', (req, res) => {
    res.render('signup', { error: "" });
});

router.post('/create-account', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Validate user input (e.g., check for empty fields, validate email format)
        if (!name || !email || !password) {
            return res.status(400).send('Invalid input');
        }
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.render('signup', { error: "User already exists" });
        }
        const newUser = new User({ name, email, password });
        await newUser.save();
        console.log('Account created successfully');
        res.redirect('/');
    } catch (error) {
        console.error('Error during account creation:', error);
        res.redirect('/login');
    }
});

router.get('/user-profile', isAuth.authenticateToken, async (req, res) => {
    try {
        // Check if user is authenticated based on req.user set by authenticateToken middleware
        if (!req.user) {
            return res.status(401).send('Unauthorized'); // Or redirect to login page
        }
        
        const userId = req.user; // Use req.user provided by the authenticateToken middleware
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        // Count the number of posts for the current user
        const postCount = await Post.countDocuments({ userId: userId });

        res.render('userProfile', { user, postCount });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/logout', (req, res) => {
    // Clear authentication token cookie
    res.clearCookie('token');
    
    // Clear session data
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Internal Server Error');
        } else {
            // Redirect to the home page after clearing the token and session data
            res.redirect('/');
        }
    });
});


router.get('/search-form', (req, res) => {
    res.render('searchForm', { error: '' });
});

module.exports = router;
