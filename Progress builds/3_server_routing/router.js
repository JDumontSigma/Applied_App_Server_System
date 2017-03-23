
//Generate a function to be exported and called in app.js
function textDisplay(request,response){
  //if the url has no path to it then execute this code
  //This code will rune if the url is
  //http://localhost/

  if(request.url === '/'){
    //make sure that the response is 200(Everything is okay)
    //declare the doctype as text/plain (This will just render out the response as normal text)
        response.writeHead(200,'text/plain');
        //Write some text to display on the
        response.write('You are currently on the home directory');
        response.write('This text will only appear when your on the home page');
        //end the reponse to stop the function looking for extra information
        response.end();
   }
}


//exporting the code to be used elsewhere
//modile.exports.(FunctionName) = (Name to use in other files)
module.exports.textDisplay = textDisplay;
