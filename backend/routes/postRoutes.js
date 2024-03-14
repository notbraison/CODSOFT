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

router.post('/create-post', async(req,res)=>{
    try {
        const date = new Date();
        const post = req.body
        const addPost = new Post({
            ...post,
            date
        })
        await addPost.save()
        res.redirect('/')
        
    } catch (error) {
        res.send(400)
        
    }
})

router.get('/', async(req,res) =>{
    try {
        const posts = await Post.find();
        res.render('showPosts',{
            posts
        })
        
    } catch (error) {
        throw new Error(error)
        
    }
})

router.post('post-delete', async(req,res)=>{
    try {
        await Post.findByIdAndDelete(req.body.postid);
        res.redirect('/')
        
    } catch (error) {
        throw new Error(error)
        }
})

router.get('/post/:postId',async(req,res)=>{
    const postId = req.params.postId
    await post.findById(postId).then(post=> {
        res.render("postDetail",{
            post:post,
            pageTitle: post.title,
            path:"/post"
        })
    }).cath(error => {throw new Error(error)})
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


module.exports = router