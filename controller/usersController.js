const jwt = require('jsonwebtoken');
const User  = require('../models/users');
const { token_secret } = require('../configuration')
const SignToken = user => {
    return token =  jwt.sign({
        iss: 'auth',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    },token_secret);
}

module.exports =  {
    
    signUP: async (req,res,next)=>{
        const {name ,email ,password} = req.value.body;

        // check email uniqueness
        const fonudUser = await User.findOne({email:email}); 
        if(fonudUser)  return res.status(401).send({error:'email is already existed'}) ;

        // create the user
        const newUser = new User({email,password,name});
        await newUser.save();

        // get the token
        const token = SignToken(newUser);

        // respone with doc
        res.status(200).json({token});
    },
    signIn: async (req,res,next)=>{
        // registering the user email and password
       
    },
    secret: async (req,res,next)=>{
        console.log('secret() is done')
    },
}