// database connection to mLab
const mongoose = require('mongoose');

mongoose.Promise = global.Promise ;
mongoose.connect('mongodb://users_app:users_app99@ds161653.mlab.com:61653/sandbox')
.then(()=> console.log('database connected ... '))
.catch(err=> console.error(err));