const passport = require('passport');
const jwtStratedgy = require('passport-jwt').Strategy;
const { ExtractJwt  } = require('passport-jwt') ;
const LocalStrategy = require('passport-local').Strategy;
const { token_secret }  = require('./configuration');
const User = require('./models/users');


// json web token stratedgy
passport.use(new jwtStratedgy({
    jwtFromRequest : ExtractJwt.fromHeader('authorization'),
    secretOrKey : token_secret
    }, async (payload,done)=>{
    try {
        // find the user in the token
        const user = await User.findById(payload.sub)

        // user don't exsit
        if(!user) return done(null,false)

        // found the usser and return it
        done(null,user)


    } 
    catch (error){
        done(error,false)
    }
    })
);

// local stratedgy for authenticating logs in
passport.use(new LocalStrategy({
    usernameField : 'email' ,

    }, async (email,password,done)=>{
        try {
            // find the user by email
            const user = await User.findOne({email});

            // if not found , handle that
            if(!user) return done(null,false);

            // check ig password is correct
            const isValidePassword = await user.validatingPassword(password); 

            // if not coorext handle that
            if(!isValidePassword) return done(null,false);

            // all success return the user
            done(null,user);

        } catch (error) {
            done(error,false)
        }

    }
))