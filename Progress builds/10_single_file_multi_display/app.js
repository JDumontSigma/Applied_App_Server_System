//require http to generate web server
var http = require('http');

//pulls in modules from router js for use in this file
// ./router.js defines that the file in within the same folder level as this file
var router = require('./router.js');


//to stop duplication of server code we shall loop through the function within a function

//create server function will contain the content
//currentPort will be passed in dynamically and will allow us to change the port number
//number will be used in changing which file we access
function createServer(currentPort,number){
  //run the server function
  http.createServer(function(request,response){
    //Call the function from router.js to display text on the home path
    router.textDisplay(request,response,number);
    //Stops the server waiting for more information
    response.end();
    //Determines what port the server will be hosted on
    //uses the variable which was passed in
  }).listen(currentPort);
  //will help us determine which ports the server is running on
  //helps in checking that the code is executed
  console.log('Sever is currently running on localhost:' + currentPort);
}

//create a loop to go through the function
//this allows us to change how many servers we want to be created easily
for(var x = 0; x < 2; x++){
  var currentPort = 3000 + x;
  createServer(currentPort,x);
}
