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
        const fonudUser = await User.findOne({'local.email':email}); 
        if(fonudUser)  return res.status(401).send({error:'email is already existed'}) ;

        // create the user
        const newUser = new User({
            method: 'local',
            local : {
              email :email ,
              password: password,
              name:name  
            }
            });
        await newUser.save();

        // get the token
        const token = SignToken(newUser);

        // respone with doc
        res.status(200).json({token});
    },
    signIn: async (req,res,next)=>{
        // generate the token 
        const token = SignToken(req.user);
        res.status(200).json({token});
        console.log('user',req.user);
       
    },
    secret: async (req,res,next)=>{
        console.log(' hi there');
        res.json({'name':'maya dan'})
    },
    googleOauth :async (req,res,next)=>{
        const token = SignToken(req.user);
        res.status(200).json({token});
    },
    facebookOauth : async (req,res,next)=>{
        const token = SignToken(req.user);
        res.status(200).json({token});
    }
    
}