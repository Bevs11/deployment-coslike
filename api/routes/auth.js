const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//Register
router.post('/register', async (request, response) => {
    try{
        //Generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(request.body.password, salt);
        //Create new user
        const  newUser = new User({
            username: request.body.username,
            email: request.body.email,
            password: hashedPassword,
        });
        //Save new user and respond
        const user = await newUser.save();
        response.status(200).send({user: user})
    } catch(error){
        response.status(500).send({error})
    }
});

//Login
router.post ('/login',  async (request, response) => {
    try{
        const user = await User.findOne({email:request.body.email});
        if (!user) return response.status(404).send({error: "User not found"});

        const validPassword = await bcrypt.compare(request.body.password, user.password)
        if (!validPassword) return response.status(400).send({error: "Invalid password"});

        response.status(200).send({user: user})
    } catch (error) {
        response.status(500).send({error})
    };
});

module.exports = router;
