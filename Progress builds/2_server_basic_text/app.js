//require http to generate web server
var http = require('http');


//run the server function
http.createServer(function(request,response){
  //writes out in the browser Hello World
  response.write('Hello World ');
  response.write('Displaying text through manual input');
  //Stops the server waiting for more information
  response.end();
  //Determines what port the server will be hosted onv
}).listen(3000);


//prints out to the console that the server is running on localhost:3000
//helps in checking that the code is executed
console.log('Sever is currently running on localhost:3000');
