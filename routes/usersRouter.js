const experess = require('express');
const  router = require('express-promise-router')();
const { validateBody , schema } = require('../helpers/routeHelpers');
const UserController = require('../controller/usersController');


// sign up route
router.route('/signUP').post(validateBody(schema.authSchema), UserController.signUP);

// sign in route
router.route('/signIn').post(UserController.signIn);

// // secret route
router.route('/secret').get(UserController.secret);

module.exports = router;