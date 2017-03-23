'use strict';
/****************************************************************
Set up variables and require required classes
*****************************************************************/
//addon to aid in writing json to files
  var jsonfile = require('jsonfile');
//allows me to read in the content from directories
  var dir = require('node-dir');
//set file path to store the stats about the server
  var filePath = 'static/storage/server_stats.txt';
//Create an empty JSON object to store information about each server
  var servers = {
    server:{}
  };
// used when retrieving files, stores them initialy ready for manipulation
  var fileList;
//create an empty array ready for the split content from fileList
  var fileArray = new Array();
//This will be created by loop[ing the fileArray to story information about the files gathered
  var fileObj = {};
//set the default class to 0 this is then used to loopthrough the uploaded content
  var current_file = 0;

/*--------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------*/

/****************************************************************
Start of retrieveFiles

take in information about each server including port and number
Reads all the file names from the advert folder under static
places them into a variable for manipulation
this is beneficial as it aids in automation and reduces need for human input
*****************************************************************/

function retrieveFiles(currentPort,x){
  // display contents of files in this script's directory
dir.readFiles('static/advert/',
    function(err, content, next) {
        if (err) throw err;
        next();
    },
    function(err, files){
        if (err) throw err;
        fileList = files;
        fileList = fileList.toString().split(',');
        for(var i = 0; i < fileList.length; i++){
          fileArray.push(fileList[i]);
          fileObj[i] = fileList[i];
        }
        //once all the information has been gathered and stored appropriately intiate the storage of data
        addToJSON(currentPort,x);
    });

}
/*--------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------*/

/****************************************************************
Start of addToJSON function
*****************************************************************/

function addToJSON(currentPort,x){

  var date = new Date();
  var start_date = date.getDate() + ":" + (date.getMonth() + 1) + ":" + date.getFullYear();
  var start_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds();

  var time_taken = date.getTime();
  var next_update = time_taken + 3500;



  //maps the JSON object into an array format so that i can loop through it
  //var file = Object.keys(advert).map(function(response) { return advert[response] });
  //if the max limit has been reached it will reset the cycle
  if(current_file === fileArray.length){
    current_file = 0;
  }
    servers.server[x] = x;
    servers.server[x] = {'port':currentPort,'currentPosition':x,'file':fileArray[current_file]};
    servers.server_quantity = x+1;
    servers.start_date = start_date;
    servers.start_time = start_time;
    servers.last_updated = time_taken;
    servers.update_time = next_update;
    servers.files = fileObj;
    servers.file_quantity = fileArray.length;
    servers.clientPull = time_taken;

    jsonfile.writeFileSync(filePath,servers,{spaces:2},function(){
    });


    current_file++;



}

//exports it to be used in another file
module.exports.addToJSON = addToJSON;
module.exports.retrieveFiles = retrieveFiles;
