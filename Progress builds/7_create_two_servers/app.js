//require http to generate web server
var http = require('http');

//pulls in modules from router js for use in this file
// ./router.js defines that the file in within the same folder level as this file
var router = require('./router.js');


//run the server function
http.createServer(function(request,response){
  //Call the function from router.js to display text on the home path
  router.textDisplay(request,response);
  //Stops the server waiting for more information
  response.end();
  //Determines what port the server will be hosted onv
}).listen(3000);

//Running the same code as before but changing the port number
//this generates two servers on the same URL but on different ports
//These servers will still display the same content however work seperately of each other, e.g you can go to the error page on one without affecting the other
//run the server function
http.createServer(function(request,response){
  //Call the function from router.js to display text on the home path
  router.textDisplay(request,response);
  //Stops the server waiting for more information
  response.end();
  //Determines what port the server will be hosted onv
}).listen(3001);

//prints out to the console that the server is running on localhost:3000
//helps in checking that the code is executed
console.log('Sever is currently running on localhost:3000');
