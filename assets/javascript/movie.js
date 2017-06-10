$(document).ready(function() {

  //global variables

var topics = ["Basketball", "Baseball", "Tennis", "Soccer", "Golf", "Football", "Weightlifting", "Crossfit", "Volleyball", "Running", "Boxing"];
var frozenImgUrl = '';
var movingImgUrl = '';
var gifCondition = '';
var frozenUrl = '';
var movingUrl = '';


var makeButton = function (){
  $('#btn-area').empty();
  for (var i = 0; i < topics.length; i++) {
    //This function will turn items in topic array into buttons.
    var newButton = $("<button>");
    newButton.attr("data-name", topics[i]);
    newButton.attr("class", "gif");
    newButton.text(topics[i]);
    $("#btn-area").append(newButton);
    console.log(newButton);
  }
}

var submit = function() {
  $('#submit-btn').on('click', function(event) {
    event.preventDefault();
    var inputVal = $('#userInput').val();
    topics.push(inputVal);
    makeButton();
   console.log(inputVal);
   console.log(topics);
        });
    }


var showGif = function (){
  var btnVal = $(this).data("name");
  var gifKey = "dc6zaTOxFJmzC";
  var gifUrl = "https://api.giphy.com/v1/gifs/search?q=" + btnVal + "&api_key=" + gifKey;

  $.ajax({
  url: gifUrl,
  method: 'GET'
  }).done(function(response) {

  $(".gifarea").empty();

  for (var i = 0; i < topics.length; i++) {
    frozenImgUrl = response['data'][i]['images']['fixed_height_still']['url'];
    movingImgUrl = response['data'][i]['images']['fixed_height']['url'];

    var rating = response['data'][i]['rating'];
    var newDiv = $('<div id="imgdiv">');
    var newPara = $('<p>');
    var newGif = $('<img>');

    newGif.attr("data-still", frozenImgUrl);
    newGif.attr("data-animate", movingImgUrl);
    newGif.attr("src", frozenImgUrl);
    newGif.attr("data-type", "still");
    newGif.addClass("gifImage");
    newPara.html('Rating: ' + rating);
    $(newPara).appendTo(newDiv);
    $(newGif).appendTo(newDiv);
    $(".gifarea").append(newDiv);
  }

  });
}

var activateGif = function(){
  gifCondition = $(this).data("type");
  frozenUrl = $(this).data("still");
  movingUrl = $(this).data("animate");

  if (gifCondition === "still") {
    $(this).attr("src", movingUrl);
    $(this).data("type", "animate");

  } else if (gifCondition === 'animate') {
    $(this).attr('src', frozenUrl);
            //Switch the data-type to still
    $(this).data('type', 'still');
            //Testing
            console.log(gifCondition);
  }
}

makeButton();
submit();
$(document).on('click', '.gif', showGif);
$(document).on('click', '.gifImage', activateGif);

});