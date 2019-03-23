const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
// const exphbs  = require('express-handlebars');


const app = express();
app.use(cors());

// get the database connection file
require('./config/db');

//  template engine
// app.engine('handlebars', exphbs({
//     defaultLayout: 'main' , 
//     partialsDir: __dirname + '/views/partials/'
// }));
// app.set('view engine', 'handlebars');

// body parser 
app.use(morgan('dev'));
app.use(bodyParser.json());

// setting a global vars 
// app.use((req,res,next)=>{
//     next();
// });

//routes 
app.use('/users', require('./routes/usersRouter'));

module.exports = app;
