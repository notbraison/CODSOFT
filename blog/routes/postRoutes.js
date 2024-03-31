const express = require("express")
const router = express.Router()
const User = require('../db/models/userModel')
const Post = require('../db/models/postModel')
const isAuth = require('../middleware/isAuth')

router.get('/create-post',   isAuth.authenticateToken,   async (req, res) => {
    if (typeof req.user === 'string') {
        const currentUser = await User.findById({ _id: req.user });
        if (currentUser) {
            res.render('createPost', {
                user: currentUser.name,
                id: currentUser._id,
            });
        } 
    } else {
        res.redirect('/');
    }
});

router.post('/create-post', isAuth.authenticateToken, async (req, res) => {
    try {
        // Ensure that the user is logged in and the userId is available in the session
        const userId = req.user; // Use req.user provided by the authenticateToken middleware

        if (!userId) {
            // If the user is not logged in, redirect to the login page or handle accordingly
            return res.redirect('/login');
        }

        // Extract post data from the request body
        const { title, description } = req.body;

        // Create a new post object with the provided data and user ID
        
        const newPost = new Post({
            title,
            description,
            author: userId, // Associate post with the logged-in user
            date: new Date() // Optionally, set the date to the current date
        });
        

        // Save the new post to the database
        await newPost.save();
        console.log("post created successfully")
        console.log("posttitle: "+newPost.title," postauthor: "+newPost.author)

        // Redirect to the home page or display a success message
        res.redirect('/');
    } catch (error) {
        // Handle errors appropriately (e.g., render an error page or send an error response)
        console.error('Error creating post:', error);
        res.status(500).send('Internal Server Error');
    }
});




router.get('/', async(req,res) =>{
    try {
        //In your views, you can then access the author's details like post.author.name, assuming your user schema has a name field.
        const posts = await Post.find().populate('author');
        res.render('showPosts',{
            posts
        })
        
    } catch (error) {
        throw new Error(error)
        
    }
})

router.post('/post-delete', async (req, res) => {
    try {
        const postId = req.body.postid;
        // Check if postId is valid
        if (!postId) {
            return res.status(400).send('Post ID is required');
        }

        // Attempt to find and delete the post
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            // Post with the specified ID was not found
            return res.status(404).send('Post not found');
        }

        // Post deleted successfully
        console.log("Post deleted successfully")
        res.redirect('/');
    } catch (error) {
        // Handle errors
        console.error('Error deleting post:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/post/:postId',async(req,res)=>{
    const postId = req.params.postId
    await Post.findById(postId).then(post=> {
        res.render("postDetail",{
            post:post,
            pageTitle: post.title,
            path:"/post"
        })
    }).catch(error => {throw new Error(error)})
})

router.post('/post-update', async(req,res)=>{
    try {
        const post = await post.findById(req.body.postId)
        await post.updateOne({
            title:req.body.title || post.title,
            description:req.body.description || post.description,
        })
        res.redirct('/')
        
    } catch (error) {
        throw new Error('error')        
    }
})

router.get('/search', async (req, res) => {
    try {
        const query = req.query.query; // Get the search query from the request

        // Perform the search logic based on the query, for example:
        const searchResults = await Post.find({ $text: { $search: query } });

        // Render the showPosts page with the found posts
        res.render('showPosts', { posts: searchResults });
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = router