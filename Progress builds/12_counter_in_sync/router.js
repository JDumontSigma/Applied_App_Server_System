//Require the ability to read in files
var fs = require('fs');

//require the render file to merge content dynamically from one file
//will be called here rather than response.write
var render = require('./render.js');


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
  //  else{
   //
  //    //make sure that the response is 200(Everything is okay)
  //    //declare the doctype as text/plain (This will just render out the response as normal text)
  //        response.writeHead(200,'text/html');
   //
  //       //same process as before just accessing a page for errors now
  //        var error = fs.readFileSync('./views/error.html',{encoding: 'utf8'});
   //
  //       //display the error page out to the browseer
  //        response.write(error);
   //
  //       //This is code to perform a redirect back to the home page
  //       //I have commented it out to prove that the previous error handling works
  //       //status code 301 is used for permanant URL redirects
  //       // response.writeHead(301,
  //       //location specifies where we will send the user, in this case he home directory
  //       //    {Location: '/'}
  //       //  );
   //
   //
  //        //end the reponse to stop the function looking for extra information
  //        response.end();
  //  }
}


//exporting the code to be used elsewhere
//modile.exports.(FunctionName) = (Name to use in other files)
module.exports.textDisplay = textDisplay;
