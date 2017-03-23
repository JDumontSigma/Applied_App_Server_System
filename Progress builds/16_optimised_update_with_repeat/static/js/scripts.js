//defining global variables here
var current_port;

var next_update;
var current_time;
var time_to_update;

var storedData;
var currentNumber;
var arrayLength;

var file_names = new Array();

var display_contents;

//function to retrieve any necessary data required, whilst setting up key variables
//it will then initiate the loop function
  function setUp(port){
    //works out what port number the server is on
    currentNumber = port;
    current_port = 3000 + port;
      $.get('http://localhost:' + current_port + '/static/storage/server_stats.txt', function(data) {
        //retriecve the server stats data
         storedData = JSON.parse(data);

        //store all the file data into an array, this reduces the need to fetch info from the server
         $.each(storedData.files, function(index,element){

           //retrieves the data from dynamivally generated URLS
           $.get('http://localhost:' + current_port + '/static/advert/' + element + '.html', function(data) {
             //add the data recieved from the files into an array
              file_names.push(data);
              //once this has been done it increase the value set into the array length value
           }).done(function(data){
             //set the array length this helps with looping
             arrayLength = file_names.length;
           });
         });
         //works out when the file should be updated
         next_update = storedData.update_time;
         //sets the data type and will run a function after all the information has been recieved
      }, 'text').done(function(data){
        //check that their is actually a value greater than 0 in the length
        //this prevents the pages syncing up
        check_array();

      });
  }




function check_array(){
  //if the lenght of the array is 0 keep checking
  if (file_names.length === 0){
    setTimeout(check_array,50);
  }else{
    //if the array length is greater than 0 the data has been retried and set the value
    arrayLength = file_names.length;
    //once the value is set we can then begin running the sequence onr repeat
    displayLoop();
  }
}





function displayLoop(){
  currentNumber = currentNumber - 1;
  if(currentNumber < 0){
    //alert("My current number is  " +  currentNumber);
    currentNumber = arrayLength - 1;
  }
  console.log(currentNumber + file_names[currentNumber]);
  display_contents = file_names[currentNumber];
  $('#body').html(currentNumber + display_contents);

  //run this just before working out update time
  //allows for as close as possible calculations
  current_time = currentTime();

  //time to update will need to update frequently
  time_to_update = next_update - current_time;

  //add 3.5 seconds to next update to keep the loop occuring
  next_update = next_update + 3500;

  //this will loop the function over and over
  setTimeout(displayLoop,time_to_update);
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
