'use strict';
/****************************************************************
Defining global Variables to be used and reused throughout the displays
*****************************************************************/

//defines where the content should start as well as used in url queires
  var currentPort,
  //TIME BASED VARIABLES
//retrieve information from server regarding last update
  lastServerUpdate,
//work out the next update time based on the previous update
  nextUpdate,
//stores the current time to dynamically work out how long until next update
  currentTime,
//last time the clients pulled in data
  dataPull,
//used to store the outcome of calculations for next update
  timeToUpdate;

  //CONTENT BASED VARIABLES
//Stores all the data retrieved from the files
  var storedData,
//stores what is the current position to
  currentNumber,
//works out how long the array lenght is, this is used to control the flow
  arrayLength,
//this updates regularly with the latest content to be displayed to the screen
  contentDisplay;
//Create an empty array to store all the file content gatherd
  var fileNames = new Array();

  /*--------------------------------------------------------------------------------------------------------
  ---------------------------------------------------------------------------------------------------------*/


  /****************************************************************
  Start of get currentTime function

  This is used to get the current time in seconds since 1970
  this is what I am using to calculate every 3.5 seconds
  *****************************************************************/
  //to work out the current time in second
  function getCurrentTime(){
    //create a new date variable
    var date = new Date();
    //get the amount of seconds passed
    var currentTime = date.getTime();
    //return the number to the variable set
    return currentTime;
  }

  /*--------------------------------------------------------------------------------------------------------
  ---------------------------------------------------------------------------------------------------------*/


  /****************************************************************
  Compare arrays

  Comapres two arrays and checks whether they are equal
  *****************************************************************/
  function arraysEqual() {

      if(tempFileHold.length !== fileNames.length)
          return false;
      for(var i = tempFileHold.length; i--;) {
          if(tempFileHold[i] !== fileNames[i])
              return false;
      }
      return true;
  }
  /*--------------------------------------------------------------------------------------------------------
  ---------------------------------------------------------------------------------------------------------*/


  /****************************************************************
  Check arrays are filled

  Makes sure arrays have content in
  *****************************************************************/
  function arrayFilled(){
    if(tempFileHold.length === 0){
      setTimeout(arrayFilled,100);
    }else{
      fileNames = tempFileHold;
      arrayLength = tempFileHold.length;
      tempFileHold = [];
      var sameContent = arraysEqual(fileNames,fileNames);
      if(!sameContent){
        currentNumber = currentPort - 3000;
      }
    }
  }
/*--------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------*/


/****************************************************************
Display Loop function

this content will be responsible for updting the front end HTML on screen
it will also make sure the update occurs on time within reseaon

It is used to loop through the array which was created in the setUp function
*****************************************************************/


function displayLoop(){
//minus on so the screen emulate content moving left to right
//turn to + to emulate right to left
  currentNumber = currentNumber - 1;
  if(currentNumber < 0){
  //alert("My current number is  " +  currentNumber);
    currentNumber = arrayLength - 1;
  }
//set the variabel to update the html within the body
  contentDisplay = fileNames[currentNumber];
//alters the body on screen to the new display
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

//run the same function again instantly
    displayLoop();
  }else{
//add 3.5 seconds to next update to keep the loop occuring
    nextUpdate = nextUpdate + 3500;
//this will loop the function over and over
    setTimeout(displayLoop,timeToUpdate);
  }//end if

}

/*--------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------*/

  /***************************************************************
  CheckArray

  This will keep checking the array to make sure there is content within
  This is due to the synchronous function called in the setUp
  Thus meaning functions begin to fire before all content is set, this helps prevent that
  *****************************************************************/

function checkArray(){
  //if the lenght of the array is 0 keep checking
  if (fileNames.length === 0){
    //if there is no content rerun this piece of code in 0.05 seconds
    setTimeout(checkArray,50);
  }else{
    //if the array length is greater than 0 the data has been retried and set the value
    arrayLength = fileNames.length;
    //once the value is set we can then begin running the sequence onr repeat
    displayLoop();
  }
}

/*--------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------*/

/****************************************************************
Start of Set Up Function

This is the initial and most vital function to run
This gathers all the content fromthe files and assigns key variables
after retrieving the information it stores each piece into an array
*****************************************************************/


//function to retrieve any necessary data required, whilst setting up key variables
//it will then initiate the loop function
  function setUp(port){
    //works out what port number the server is on
    currentPort = 3000 + port;
      $.get('http://localhost:' + currentPort + '/static/storage/server_stats.txt', function(data) {
       //retriecve the server stats data
         storedData = JSON.parse(data);
         lastServerUpdate = storedData.last_updated;
         currentNumber = port;
         dataPull = storedData.clientPull;

        //store all the file data into an array, this reduces the need to fetch info from the server
         $.each(storedData.files, function(index,element){
         //retrieves the data from dynamivally generated URLS
           $.get('http://localhost:' + currentPort + "/" +  element, function(data) {
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


  /*--------------------------------------------------------------------------------------------------------
  ---------------------------------------------------------------------------------------------------------*/
  var tempFileHold = [];

function updateContent(currentPort){
  var tempStoredData;
  $.get('http://localhost:' + currentPort + '/static/storage/server_stats.txt', function(data) {
   //retriecve the server stats data
     tempStoredData = JSON.parse(data);
     var fileQuantity = tempStoredData.file_quantity;
    //store all the file data into an array, this reduces the need to fetch info from the server
     $.each(tempStoredData.files, function(index,element){
     //retrieves the data from dynamivally generated URLS
       $.get('http://localhost:' + currentPort + "/" +  element, function(data) {
        //add the data recieved from the files into an array
          tempFileHold.push(data);
      });
    });

    //sets the data type and will run a function after all the information has been recieved
  }, 'text').done(function(){
    arrayFilled();

  });
  //var sameContent = arraysEqual();

  setTimeout(function(){
    updateContent(currentPort);
  },10000);
}
