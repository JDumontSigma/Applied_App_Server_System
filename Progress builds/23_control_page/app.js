'use strict';

//require http to generate web server
var http = require('http');

//pulls in modules from router js for use in this file
// ./router.js defines that the file in within the same folder level as this file
var router = require('./router.js');

//pulls in modules from router js for use in this file
// ./router.js defines that the file in within the same folder level as this file
var serverSetUp = require('./server_setup.js');

var autoUpdate = require('./server_auto_update.js');

//pull in plugin to open browsers automaticcly
var open = require('opn');

//to repeat a job on the server side automatically once it is up and running
var CronJob = require('cron').CronJob;



//declaring the function to run automatically
var job = new CronJob({
  //as the extension on allows whole seconds, run this code every 7 seconds but internally run a function twice
  cronTime: '*/7 * * * * *',
  onTick: function() {

     autoUpdate.update(false);
  },
  start: true,
  timeZone: 'America/Los_Angeles'
});

//initiating the job on load
job.start();


//create a loop to go through the function
//this allows us to change how many servers we want to be created easily
//to change how many server are opened change the x<2 to another number
var number_of_servers = 3;


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





for(var x = 0; x < number_of_servers; x++){

    var currentPort = 3000 + x;
    createServer(currentPort,x);
    serverSetUp.retrieveFiles(currentPort,x);

}





//Create the control panel server
//this provide at least 2677 servers to be made before hand
//number can be increase if needed
http.createServer(function(request,response){
  //Call the function from router.js to display text on the home path
  router.styleView(request,response);
  router.controlPage(request,response);
  //Stops the server waiting for more information
  response.end();
  //Determines what port the server will be hosted on
  //uses the variable which was passed in
}).listen(5678);
