// On document ready, create buttons and append
// for loop

var characters = [
  "Zelda",
  "Mario",
  "Sonic",
  "Link",
  "Luigi",
  "Yoshi",
  "Kirby",
  "Captain Falcon",
  "Star Fox",
  "Ness"
];

function createButtons() {
    ``
  for (var i = 0; i < characters.length; i++) {
    var gifButtons = $("<button>");
    gifButtons
      .attr("data-character", characters[i])
      .text(characters[i])
      .addClass("generatedButtons");
    console.log(gifButtons);
    $("#buttonslist").append(gifButtons);
  }
}

$(document).ready(function() {
  createButtons();
  // Event listener on click - make call to AJAX and display gifs
  // api call
  // then append in a for loop

  $("#submitbutton").click(function(event) {
    event.preventDefault();
    var userInput = $("#userinput")
      .val()
      .trim();
    console.log(userInput);
    characters.push(userInput);
    console.log(characters);
    // console.log(characters)
    createButtons();
    
    // var newButton = $("<button>");
    // newButton
    //   .attr("data-character", userInput)
    //   .text(userInput)
    //   .addClass("generatedButtons");
    // console.log(newButton);
    // $("#buttonslist").append(newButton);

  
  });

  $(".generatedButtons").on("click", function() {
    console.log(this);
    var character = $(this).attr("data-character");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      character +
      "&api_key=uswMWRxsdclBSr4q7BmEIwwHIFz1cqfI&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;
      console.log(results);
      for (var i = 0; i < results.length; i++) {
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          var gifDiv = $("<div>");
          var rating = results[i].rating;
          var p = $("<p>").text("Rating:" + rating);
          var characterImg = $("<img>");

          characterImg.attr("src", results[i].images.fixed_height_still.url);
          characterImg.attr("data-state", "still");
          characterImg.attr(
            "data-still",
            results[i].images.fixed_height_still.url
          );
          characterImg.attr("data-active", results[i].images.fixed_height.url);

          gifDiv.append(characterImg);
          gifDiv.append(p);
          $("#giflist").prepend(gifDiv);

          // add event listener to play and pause gifs for on click of the gif
          // if not working check button function above and change class/id to be specific to submit vs gif buttons

          $(characterImg).click(function() {
            var state = $(this).attr("data-state");

            if (state === "still") {
              $(this).attr("src", $(this).attr("data-active"));
              $(this).attr("data-state", "active");
              console.log("ACTIVATE");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
              console.log("BE STILL");
            }
          });
        }
       
      }
    });
  });
  // take user input and on click function, generate and push button to initial button array
  

});