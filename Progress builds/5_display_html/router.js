
//Generate a function to be exported and called in app.js
function textDisplay(request,response){
  //if the url has no path to it then execute this code
  //This code will rune if the url is
  //http://localhost/

  if(request.url === '/'){
    //make sure that the response is 200(Everything is okay)
    //declare the doctype as text/html (This will just render out the response as html code)
        response.writeHead(200,'text/html');
        //Write some text to be rendered out as html content
        response.write('<h1>This should be a nice title</h1>');
        response.write('<h2>With a nice sub heading</h2>');
        //end the reponse to stop the function looking for extra information
        response.end();
   }
   //provide basic error handling for if people try to visit an external page
   //code can be implemented to redirect back to the home page
   else{

     //make sure that the response is 200(Everything is okay)
     //declare the doctype as text/plain (This will just render out the response as normal text)
         response.writeHead(200,'text/plain');
         //Write some text to display on the
         response.write('You have tried to visit an external page ');
         response.write('This page does not exist so here is your 404 dummy page');

        //This is code to perform a redirect back to the home page
        //I have commented it out to prove that the previous error handling works
        //status code 301 is used for permanant URL redirects
        // response.writeHead(301,
        //location specifies where we will send the user, in this case he home directory
        //    {Location: '/'}
        //  );


         //end the reponse to stop the function looking for extra information
         response.end();
   }
}


//exporting the code to be used elsewhere
//modile.exports.(FunctionName) = (Name to use in other files)
module.exports.textDisplay = textDisplay;
