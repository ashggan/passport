const app = require('./app');

// starting the server 
var port = process.env.port || 5000 ;
app.listen(port,console.log('server running on port '+port));