function animation(delay_number){
  var delayMultiplier = delay_number;

  var newNumber = delayMultiplier;

  setInterval(function(){
  //do what you need here
  newNumber++;
  $("#header").empty();
  $("#header").html(newNumber);
  }, 3500);

}
