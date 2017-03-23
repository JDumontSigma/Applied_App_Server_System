//require fs (file system)
//this allows us to read the contents of a file dynamically
var fs = require('fs');


//pass in values and the content to be looped through
function mergeValues(values,fileContents){
  //cycle over the keys of values
  //replace all {{keys}} with value from values object
  //this will loop through all the keys in the JSON object
  for(var key in values){
    //set the parameter value to the dynamically modified page
    //key is the value we are searching for in the html files
    //values[key] is the new element o replace it
    //filecontent just reqrites the current variable
    fileContents = replaceAll("{{" + key + "}}", values[key], fileContents);
   //content = content.replace("{{" + key + "}}",values[key]);
  }
  //return merged content back to the view function
  //the key indicators have been rewritten in this version
  return fileContents;
}


//this will allow us to read in various pages
//can be used when it comes to multiple pages
//e.g index, about
//aids in the scalability and robustness of the product
//templateName == index(or something similar)
//values == (JSON object filled with values to insert into the documents)
//response allows the pass back on info to router.js
function view(templateName, values, response){
  //read from the template files
  //te file name is generated dynamically
  //for this application we will use index
  //encoding just shows it to be a web page
  var fileContents = fs.readFileSync('./views/' + templateName + '.html',{encoding: 'utf8'});


  //set the file content variable to the outcome of mergeValues function
  //pass through the values and initial page content
  fileContents = mergeValues(values,fileContents);
    //write out to the response
    //this is what is displayed in the browser
    response.write(fileContents);
  }


//loops over a string until the phrase is not found at all
  function replaceAll(find, replace, str)
      {
        //if there is more than 0 instances of a string keep looping and replacing the content
        while( str.indexOf(find) > -1)
        {
          //find it and replace the two values with each other
          str = str.replace(find, replace);
        }
        //return the string back to the previous function
        return str;
      }




      function contentType(values, request, response) {
          var fileContents = fs.readFileSync(__dirname + values);
          response.write(fileContents);
      }









 //export the module to be used in another file
module.exports.view = view;
module.exports.contentType = contentType;
