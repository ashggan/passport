const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// bring the users model 
const User = require('../models/users');

module.exports = (passport)=>{
    passport.use( 
        new LocalStrategy({usernamefield:email},(email,password,done)=>{
            // match user
            User.findOne({email:email})
            .then(user=>{
                if(!user) {
                    return done(null,false,{'message':'user dosenot exist'});
                }
                // match the password
                bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if(err) console.log(err);
                    if(isMatch){
                        return done(null,user)
                    }else{
                        return done(null,false,{'message':'Password donot match'})
                    }
                })
            })
            .catch(err => Console.log(err));
        })

        
    )
    passport.serializeUser( (user, done) => {
        done(null, user.id);
    });
      
    passport.deserializeUser( (id, done) =>{
        User.findById(id,  (err, user)=> {
            done(err, user);
        });
    });   
}
