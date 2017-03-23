//Used to write the files into storage
var fs = require('fs');

//addon to aid in writing json to files
var jsonfile = require('jsonfile');


var filePath = 'static/storage/server_stats.json';

//Create an empty JSON object
var servers = {
  server:{}
};




function addToJSON(currentPort,x){
  servers.server[x] = x;
  servers.server[x] = {'port':currentPort,'state':x};
  servers.server_quantity = x+1;
  jsonfile.writeFile(filePath,servers,{spaces:2},function(error){
    console.error(error);
  });
}

//exports it to be used in another file
module.exports.addToJSON = addToJSON;
