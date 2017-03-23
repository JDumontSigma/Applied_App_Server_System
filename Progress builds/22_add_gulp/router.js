//require the render file to merge content dynamically from one file
//will be called here rather than response.write
var render = require('./render.js');
var fs = require('fs');
var json = require('json-file');


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

function controlPage(request,response,number){
  if(request.url === 'admin.html'){

    // //make sure that the response is 200(Everything is okay)
    // //declare the doctype as text/html (This will just render out the response as html code)
      response.writeHead(200,'text/html');

      //this calls the view function from render.js
      //passing through the values and key to be replaces with the secon parameter
        render.view('header',{number:number, delay_number: 0},response);
        render.view('admin',{},response);
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
