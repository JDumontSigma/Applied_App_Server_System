'use strict';


  var fs = require('fs');
//addon to aid in writing json to files
  var jsonfile = require('jsonfile');
//allows me to read in the content from directories
  var dir = require('node-dir');
  var filePath = 'static/storage/server_stats.txt';

  var fileObj = {};

  var file_number = 0;


  var reading;

function update(reading){
  reading = reading;

  if(reading){
    reading = false;

    var file = fs.readFileSync(filePath);
    file = JSON.parse(file);

    var nextUpdate,
        newNextUpdate,
        serverQuantity,
        currentTime,
        date,
        timeDelay;

        nextUpdate = file.update_time;
        newNextUpdate = nextUpdate + 7000;


        serverQuantity = file.server_quantity;

        file.files = fileObj;

          for (var p in file.server){
            var currentFile = file.server[p].currentPosition;
            currentFile = currentFile - 2;

            if(currentFile < 0){
              currentFile = currentFile + file_number;
            }

            file.server[p].currentPosition = currentFile;
            file.server[p].file = file.files[currentFile];
          }

        date = new Date();
        currentTime = date.getTime();
        timeDelay = nextUpdate - currentTime;

        if(timeDelay < 0){
          timeDelay = 0;
        }

        if((currentTime - file.clientPull) > 10000){
          file.clientPull = currentTime;
        }
        file.file_quantity = file_number;
        file.last_updated = nextUpdate;
        file.update_time = newNextUpdate;

        setTimeout(function(){
          updateSubmit(file);
        },timeDelay);
  }else{
    retrieveFiles();
  }

}

function updateSubmit(updatedContent){
  jsonfile.writeFileSync(filePath,updatedContent,{spaces:2},function(){});
}


function retrieveFiles(){
  var fileList;
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
        file_number = 0;
        for(var i = 0; i < fileList.length; i++){
          fileObj[i] = fileList[i];
          file_number++;
        }
        update(true);
    });



}


module.exports.update = update;
