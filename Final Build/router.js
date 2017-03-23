'use strict';
//require the render file to merge content dynamically from one file
//will be called here rather than response.write
var render = require('./render.js');
var fs = require('fs');

var filePath = 'static/storage/server_stats.txt';


//Generate a function to be exported and called in app.js
function textDisplay(request,response,number){
  //if the url has no path to it then execute this code
  //This code will rune if the url is
  //http://localhost/
  if(request.url === '/'){
    var delayNumber = number + 1;
    //make sure that the response is 200(Everything is okay)
    //declare the doctype as text/html (This will just render out the response as html code)
        response.writeHead(200,'text/html');
      //this calls the view function from render.js
      //passing through the values and key to be replaces with the secon parameter
        render.view('header',{number:number, delay_number:delayNumber},response);
        render.view('index',{number:number,creator:number},response);
      //the values object is left empty as we have no values to pass
        render.view('footer',{},response);
      //end the reponse to stop the function looking for extra information
        response.end();
   }
   //provide basic error handling for if people try to visit an external page
   //code can be implemented to redirect back to the home page
}

function controlPage(request,response){
  if(request.url === '/'){

    var number = 5678;

    var file = fs.readFileSync(filePath);
    file = JSON.parse(file);
    var serverDataDisplay = '';
    var fileNames = '';


    for(var data in file.server){
        serverDataDisplay += '<li>';
        serverDataDisplay += '<p>Server Number: ' + data + '</p>';
        serverDataDisplay += '<p>On port number ' + file.server[data].port + '</p>';
        serverDataDisplay += '</li>';
    }
    for(var files in file.files){
      fileNames += '<li>';
      fileNames += '<p>File Name:</p>';
      fileNames += '<p>' + file.files[files] + '</p>';
      fileNames += '</li>';
    }
    //make sure that the response is 200(Everything is okay)
    //declare the doctype as text/html (This will just render out the response as html code)
        response.writeHead(200,'text/html');
      //this calls the view function from render.js
      //passing through the values and key to be replaces with the secon parameter
        render.view('adminHead',{number:number},response);
        render.view('admin',{number:number,
                            creator:number,
                            activeServers:file.server_quantity,
                            serverData:serverDataDisplay,
                            fileQuantity: file.file_quantity,
                            fileNames: fileNames},response);
      //the values object is left empty as we have no values to pass
        render.view('footer',{},response);
      //end the reponse to stop the function looking for extra information
        response.end();
   }
}

//Important to stop files being overwritte and left empty
function styleView(request, response) {
    if (request.url.indexOf('.css') !== -1) {
        response.writeHead(200, {'Content-Type': 'text/css'});
        render.contentType(request.url, request, response);
        response.end();
    }
    if (request.url.indexOf('.js') !== -1) {
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        render.contentType(request.url, request, response);
        response.end();
    }
    if (request.url.indexOf('.jpg') !== -1) {
        response.writeHead(200, {'Content-Type': 'image/jpeg'});
        render.contentType(request.url, request, response);
        response.end();
    }
    if (request.url.indexOf('.png') !== -1) {
        response.writeHead(200, {'Content-Type': 'image/png'});
        render.contentType(request.url, request, response);
        response.end();
    }
    if (request.url.indexOf('.json') !== -1) {
        response.writeHead(200, {'Content-Type': 'application/json'});
        render.contentType(request.url, request, response);
        response.end();
    }
    if (request.url.indexOf('.txt') !== -1) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        render.contentType(request.url, request, response);
        response.end();
    }
    if (request.url.indexOf('.html') !== -1) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        render.contentType(request.url, request, response);
        response.end();
    }

}

//exporting the code to be used elsewhere
//modile.exports.(FunctionName) = (Name to use in other files)
  module.exports.textDisplay = textDisplay;
  module.exports.controlPage = controlPage;
  module.exports.styleView = styleView;
