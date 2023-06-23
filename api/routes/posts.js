const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');

//Create a post
router.post('/', async(request, response) => {
    const newPost = new Post(request.body)
    try{
        const savedPost = await newPost.save();
        response.status(200).send({ savedPost });
    } catch(error){
        response.status(500).send({error});
    }
});

//Update a post
router.put('/:id', async(request, response) => {
    try{
        const post = await Post.findById(request.params.id);
        if(post.userId === request.body.userId){
            await post.updateOne({$set:request.body});
            response.status(200).send({message: 'Post has been updated'});
        } else {
            response.status(403).send({error: 'You can only update your posts'});
        }
    } catch(error){
        response.status(500).send(error)
    }
});

//Delete a post
router.delete('/:id', async(request, response) => {
    try{
        const post = await Post.findById(request.params.id);
        if(post.userId === request.body.userId){
            await post.deleteOne({$set:request.body});
            response.status(200).send({message: 'Post has been deleted'});
        } else {
            response.status(403).send({error: 'You can only delete your posts'});
        }
    } catch(error){
        response.status(500).send(error)
    }
});

//Like a post
router.put('/:id/like', async (request, response) => {
    try{
        const post = await Post.findById(request.params.id);
        if(!post.likes.includes(request.body.userId)){
            await post.updateOne({ $push: { likes: request.body.userId} });
            response.status(200).send({message: 'The post has been liked'});
        } else{
            await post.updateOne({ $pull: {likes: request.body.userId}});
            response.status(200).send({message: 'You have removed your like'});
        }
    } catch(error){
        response.status(500).send(error)
    }
});

//Dislike a post
router.put('/:id/dislike', async (request, response) => {
    try{
        const post = await Post.findById(request.params.id);
        if(!post.dislikes.includes(request.body.userId)){
            await post.updateOne({ $push: { dislikes: request.body.userId} });
            response.status(200).send({message: 'The post has been disliked'});
        } else{
            await post.updateOne({ $pull: {dislikes: request.body.userId}});
            response.status(200).send({message: 'You have removed your dislike'});
        }
    } catch(error){
        response.status(500).send(error)
    }
});

//Get a post
router.get('/:id', async (request, response) => {
    try{
        const post = await Post.findById( request.params.id );
        response.status(200).send({ post: post });
    } catch(error){
        response.status(500).send({ error: 'Post not found' });
    }
});

//Timeline posts
router.get('/timeline/:userId', async(request, response) => {
    try{
        const currentUser = await User.findById(request.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.following.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        response.status(200).json(userPosts.concat(...friendPosts))
    } catch(error){
        response.status(500).send({error: "No posts found"});
    }
});

//Get user's posts
router.get('/profile/:username', async(request, response) => {
    try{
        const user = await User.findOne({username: request.params.username})
        const posts = await Post.find({userId: user._id})
        response.status(200).send({posts});
    } catch(error){
        response.status(500).send({error: "No posts found"});
    }
});


module.exports = router;