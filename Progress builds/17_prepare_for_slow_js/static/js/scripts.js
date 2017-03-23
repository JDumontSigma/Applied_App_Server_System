//defining global variables here
var currentPort;

var nextUpdate;
var currentTime;
var timeToUpdate;

var storedData;
var currentNumber;
var arrayLength;

var fileNames = new Array();

var contentDisplay;

//function to retrieve any necessary data required, whilst setting up key variables
//it will then initiate the loop function
  function setUp(port){
    //works out what port number the server is on
    currentNumber = port;
    currentPort = 3000 + port;
      $.get('http://localhost:' + currentPort + '/static/storage/server_stats.txt', function(data) {
        //retriecve the server stats data
         storedData = JSON.parse(data);

        //store all the file data into an array, this reduces the need to fetch info from the server
         $.each(storedData.files, function(index,element){

           //retrieves the data from dynamivally generated URLS
           $.get('http://localhost:' + currentPort + '/static/advert/' + element + '.html', function(data) {
             //add the data recieved from the files into an array
              fileNames.push(data);
              //once this has been done it increase the value set into the array length value
           }).done(function(){
             //set the array length this helps with looping
             arrayLength = fileNames.length;
           });
         });
         //works out when the file should be updated
         nextUpdate = storedData.update_time;
         //sets the data type and will run a function after all the information has been recieved
      }, 'text').done(function(){
        //check that their is actually a value greater than 0 in the length
        //this prevents the pages syncing up
        checkArray();

      });
  }


function checkArray(){
  //if the lenght of the array is 0 keep checking
  if (fileNames.length === 0){
    setTimeout(checkArray,50);
  }else{
    //if the array length is greater than 0 the data has been retried and set the value
    arrayLength = fileNames.length;
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
  console.log(currentNumber + fileNames[currentNumber]);
  contentDisplay = fileNames[currentNumber];
  $('#body').html(contentDisplay);

  //run this just before working out update time
  //allows for as close as possible calculations
  currentTime = getCurrentTime();

  //time to update will need to update frequently
  timeToUpdate = nextUpdate - currentTime;

  //this will run if the process has taken too long
  //if will then rerun the content whilst updating necessary parts
  //the overall affect will just appear as a jump
  if(timeToUpdate < 0){
    //adds the new update time
    nextUpdate = nextUpdate + 3500;
    //run the same function again instantly
    displayLoop();
  }else{
    //add 3.5 seconds to next update to keep the loop occuring
    nextUpdate = nextUpdate + 3500;
    //this will loop the function over and over
    setTimeout(displayLoop,timeToUpdate);
  }

}


//to work out the current time in second
function getCurrentTime(){
  //create a new date variable
  var date = new Date();
  //get the amount of seconds passed
  var currentTime = date.getTime();
  //return the number to the variable set
  return currentTime;
}
