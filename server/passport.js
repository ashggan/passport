const passport = require('passport');
const jwtStratedgy = require('passport-jwt').Strategy;
const { ExtractJwt  } = require('passport-jwt') ;
const LocalStrategy = require('passport-local').Strategy;
const { token_secret , Oauth }  = require('./configuration');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const User = require('./models/users');

// facebook auth stratedgy 
passport.use('fbToken',new FacebookTokenStrategy({
        clientID: Oauth.facebook.clientID ,
        clientSecret : Oauth.facebook.clientSecret
    },async (accessToken, refreshToken, profile, done)=>{
       try {

        // check if user exist
        const foundUser = await User.findOne({'facebook.id': profile.id});
        if(foundUser) return done(null,foundUser);

        // create the new user
        const gglUser = new User({
            method: 'facebook',
            facebook:{
                id: profile.id,
                email: profile.emails[0].value
            }
        });

        // save the user 
        await gglUser.save();
        done(null,gglUser);

       } catch (error) {
           
       }
    }))

// google auth stratedgy
passport.use('gglToken',new GooglePlusTokenStrategy({
    clientID: Oauth.google.clientID ,
    clientSecret: Oauth.google.clientSecret
    }
    ,async(accessToken, refreshToken, profile, done)=>{
        try {
            // check if user exist
            const foundUser = await User.findOne({'google.id': profile.id});
            if(foundUser) return done(null,foundUser);

            // create the new user
            const gglUser = new User({
                method: 'google',
                google:{
                    id: profile.id,
                    email: profile.emails[0].value
                }
            });

            // save the user 
            await gglUser.save();
            done(null,gglUser);
            
        } catch (error) {
            console.log(error);
            done(error,false);
        }
}))


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
            const user = await User.findOne({'local.email':email});

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