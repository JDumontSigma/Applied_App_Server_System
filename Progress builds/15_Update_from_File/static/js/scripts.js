
  function getData(port){
    //works out what port number the server is on
    var current_port = 3000 + port;
    //will be the storage for the current file name
    var file;
    var last_modified;
    var next_update;
    var current_time;
    var time_to_update;
      $.get('http://localhost:' + current_port + '/static/storage/server_stats.txt', function(data) {

         data = JSON.parse(data);

         file = data.server[port].file + ".html";
         //reads in from the file when the file was last updated
         last_modified = data.time_taken;
         //works out when the file should be updated
         next_update = data.update_time;

         //runs a function to retrieve the current time on the computer
         //this is based in second from 1970
         current_time = currentTime();
         //work out the difference from the planed update from now
         //this allows us to run a function after a dynamically set delay
         time_to_update = next_update - current_time;

         //log some information into the console for testing purposes
         console.log("time this was run " + current_time);
         console.log("this much time to update " + time_to_update);


         //will run a function after a period of time
         //call the function, add in the dynamically set delay
         setTimeout(log,time_to_update);

      }, 'text').done(function(){

        //this was setting the body to the file text initially
        $.get('http://localhost:' + current_port + '/static/advert/' + file, function(data) {
           $('#body').html(data);
        });
      });



  };


function log(){
  var update_time = currentTime();
  $('#body').html("the document would be updated at" + update_time);
}


//to work out the current time in second
function currentTime(){
  //create a new date variable
  var date = new Date();
  //get the amount of seconds passed
  var currentTime = date.getTime();
  //return the number to the variable set
  return currentTime;
}
