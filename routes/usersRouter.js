const experess = require('express');
const  router = require('express-promise-router')();
const { validateBody , schema } = require('../helpers/routeHelpers');
const UserController = require('../controller/usersController');
const passport = require('passport');
const passportConst = require('../passport');

// sign up route
router.route('/signUP').post(validateBody(schema.authSchema), UserController.signUP);

// sign in route
router.route('/signIn').post(validateBody(schema.loginSchema),passport.authenticate('local',{session:false}) ,UserController.signIn);

// // secret route
// jwt is authenticaing func belong to passport allow the serve to check the user validity
router.route('/secret').get(passport.authenticate('jwt',{session:false}) ,UserController.secret);

//google Oauth route
router.route('/google/oauth').post(passport.authenticate('gglToken',{session:false}),UserController.googleOauth);

module.exports = router;