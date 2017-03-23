//Used to write the files into storage
var fs = require('fs');

//addon to aid in writing json to files
var jsonfile = require('jsonfile');


var filePath = 'static/storage/server_stats.txt';
var advertPath = 'static/storage/advert_file.txt';
//Create an empty JSON object
var servers = {
  server:{}
};



var current_file = 0;
function addToJSON(currentPort,x){
  //reads in all the currently saved files for putting onto the screens
  var advert = jsonfile.readFileSync(advertPath);
  var date = new Date();
  var modified_date = date.getDate() + ":" + (date.getMonth() + 1) + ":" + date.getFullYear();
  var modified_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds();

  var time_taken = date.getTime();
  var next_update = time_taken + 3500;
  //maps the JSON object into an array format so that i can loop through it
  var arr = Object.keys(advert).map(function(response) { return advert[response] });
  //if the max limit has been reached it will reset the cycle
  if(current_file === arr.length){
    current_file = 0;
  }
    servers.server[x] = x;
    servers.server[x] = {'port':currentPort,'state':x,'file':arr[current_file]};
    servers.server_quantity = x+1;
    servers.modified_date = modified_date;
    servers.modified_time = modified_time;
    servers.time_taken = time_taken;
    servers.update_time = next_update;
    servers.files = advert;
    jsonfile.writeFileSync(filePath,servers,{spaces:2},function(error){
      //console.error(error);
    });
    current_file++;



}

//exports it to be used in another file
module.exports.addToJSON = addToJSON;
