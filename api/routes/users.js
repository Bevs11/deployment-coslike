const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//Update user
router.put('/:id', async (request, response) => {
    if(request.body.userId === request.params.id || request.body.isAdmin){
        if(request.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                request.body.password = await bcrypt.hash(request.body.password, salt);
            }catch(error){
                return response.status(500).send(error);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(request.params.id, {$set: request.body,
            });
            response.status(200).send({message: 'Account has been successfully updated'})
        }catch(error){
            return response.status(500).send(error);
        }
    } else{
        return response.status(403).send({error: "You can only update your account"});
    }
});
//Delete user
router.delete('/:id', async (request, response) => {
    if(request.body.userId === request.params.id || request.body.isAdmin){
        try{
            const user = await User.findByIdAndDelete(request.params.id);
            response.status(200).send({message: 'Account has been successfully deleted'})
        }catch(error){
            return response.status(500).send(error);
        }
    } else{
        return response.status(403).send({error: "You can only delete your account"});
    }
});

//Get a user
router.get('/', async (request, response) => {
    const userId = request.query.userId;
    const username = request.query.username;
    try {
        const user = userId
        ? await User.findById(userId)
        : await User.findOne({username: username});
        const {password, updatedAt, ...other} = user._doc
        response.status(200).send(other);
    } catch(error){
        response.status(404).send({error: "User not found"});
    }
});

//Follow a user
router.put('/:id/follow', async (request, response) => {
    if(request.body.userId !== request.params.id){
        try{
            const user = await User.findById(request.params.id);
            const currentUser = await User.findById(request.body.userId);
            if(!user.followers.includes(request.body.userId)) {
                await user.updateOne({ $push: { followers: request.body.userId} });
                await currentUser.updateOne({ $push: { following: request.params.id} });
                response.status(200).send({message: `You are now following ${user.username}`})
            } else{
                response.status(403).send({error: `You are already following ${user.username}`})
            }
        } catch(error){
            response.status(500).send({error: "User not found"})
        }
    } else{
        response.status(403).send({error: "You can't follow yourself"})
    }
});
//Unfollow a user
router.put('/:id/unfollow', async (request, response) => {
    if(request.body.userId !== request.params.id){
        try{
            const user = await User.findById(request.params.id);
            const currentUser = await User.findById(request.body.userId);
            if(user.followers.includes(request.body.userId)) {
                await user.updateOne({ $pull: { followers: request.body.userId} });
                await currentUser.updateOne({ $pull: { following: request.params.id} });
                response.status(200).send({message: `${user.username} has been unfollowed`})
            } else{
                response.status(403).send({error: `You are not currently following ${user.username}`})
            }
        } catch(error){
            response.status(500).send({error: "User not found"})
        }
    } else{
        response.status(403).send({error: "You can't unfollow yourself"})
    }
});

//Get following
router.get("/following/:userId", async (request, response) => {
    try {
      const user = await User.findById(request.params.userId);
      const followings = await Promise.all(
        user.following.map((followingId) => {
          return User.findById(followingId);
        })
      );
      let followingList = [];
      followings.map((following) => {
        const { _id, username, profilePicture } = following;
        followingList.push({ _id, username, profilePicture });
      });
      response.status(200).send({followingList: followingList})
    } catch (error) {
      response.status(404).send({error: 'Followers not found' });
    }
  });
  
//Get followers
router.get("/followers/:userId", async (request, response) => {
    try {
      const user = await User.findById(request.params.userId);
      const followers = await Promise.all(
        user.followers.map((followerId) => {
          return User.findById(followerId);
        })
      );
      let followerList = [];
      followers.map((follower) => {
        const { _id, username, profilePicture } = follower;
        followerList.push({ _id, username, profilePicture });
      });
      response.status(200).send({followerList: followerList})
    } catch (error) {
      response.status(404).send({error: 'Followers not found' });
    }
  });


module.exports = router;