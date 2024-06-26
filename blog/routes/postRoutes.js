const express = require("express")
const router = express.Router()
const User = require('../db/models/userModel')
const Post = require('../db/models/postModel')
const Comment = require('../db/models/commentModel')
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
        const userId = await User.findById({ _id: req.user }); // Use req.user provided by the authenticateToken middleware

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
        
        //alert("posttitle: "+newPost.title," postauthor: "+newPost.author)

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




router.get('/post/:postId', async (req, res) => {
    try {
        const postId = req.params.postId; // Retrieve postId from URL params

        // Find the post by ID
        const post = await Post.findById(postId).populate('author');
        if (!post) {
            return res.status(404).send('Post not found');
        }

        // Find comments associated with the post
        const comments = await Comment.find({ postId }).populate('author');

        // Define pageTitle variable
        const pageTitle = post.title; // Assuming post has a title property

        // Render the postDetail template with post, comments, and pageTitle data
        res.render('postDetail', { post, comments, pageTitle });
    } catch (error) {
        console.error('Error fetching post detail:', error);
        res.status(500).send('Internal Server Error');
    }
});



router.post('/post-delete', async (req, res) => {
    try {
        const postId = req.body.postId;
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



router.post('/post-update', async (req, res) => {
    try {
        const postId = req.body.postId;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        await post.updateOne({
            title: req.body.title || post.title,
            description: req.body.description || post.description,
        });
        res.redirect('/');
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/edit-post/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        // Retrieve the post by its ID from the database
        const post = await Post.findById(postId);
        if (!post) {
            // If the post is not found, return a 404 error
            return res.status(404).send('Post not found');
        }
        // Render the edit post page and pass the post data to the view
        res.render('editPost', { post });
    } catch (error) {
        // If an error occurs, log the error and send a 500 status code
        console.error('Error fetching post for editing:', error);
        res.status(500).send('Internal Server Error');
    }
});



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

// Route to handle comment submission
router.post('/post/:postId/comment',isAuth.authenticateToken, async (req, res) => {
    try {
        const { content } = req.body;
        const postId = req.params.postId; // Retrieve postId from URL params
        const author = req.user; // Use req.user provided by the authenticateToken middleware

        // Create a new comment object
        const newComment = new Comment({
            content,
            author,
            postId
        });

        // Save the new comment to the database
        await newComment.save();

        res.redirect(`/post/${postId}`);
    } catch (error) {
        console.error('Error submitting comment:', error);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router