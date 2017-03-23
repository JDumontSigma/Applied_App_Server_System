Error.stackTraceLimit = 50;

//require http to generate web server
var http = require('http');

//pulls in modules from router js for use in this file
// ./router.js defines that the file in within the same folder level as this file
var router = require('./router.js');


//pulls in modules from router js for use in this file
// ./router.js defines that the file in within the same folder level as this file
var serverStats = require('./server_stats.js');

//pull in plugin to open browsers automaticcly
var open = require('opn');


//to stop duplication of server code we shall loop through the function within a function

//create server function will contain the content
//currentPort will be passed in dynamically and will allow us to change the port number
//number will be used in changing which file we access
function createServer(currentPort,number){
  //run the server function
  http.createServer(function(request,response){
    //Call the function from router.js to display text on the home path

    router.styleView(request,response);
    router.textDisplay(request,response,number);
    router.controlPage(request,response,number);

    //Stops the server waiting for more information
    response.end();
    //Determines what port the server will be hosted on
    //uses the variable which was passed in
  }).listen(currentPort);

  //will help us determine which ports the server is running on
  //helps in checking that the code is executed
  console.log('Sever is currently running on localhost:' + currentPort);
  //code to open a browser automatically
  //dynamically generate the page it should open with the first parameter
  //the second parameter set the application it should open it
  //in this case google chrome
  open('http://localhost:' + currentPort, {app:['google chrome']});

  //purpose to make sure browsers are close as possible in sync with each other

}


//create a loop to go through the function
//this allows us to change how many servers we want to be created easily
//to change how many server are opened change the x<2 to another number
var number_of_servers = 3;
for(var x = 0; x < number_of_servers; x++){
  var currentPort = 3000 + x;
  serverStats.addToJSON(currentPort,x);
  createServer(currentPort,x);


}
