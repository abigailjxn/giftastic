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

$(document).ready(function() {
  for (var i = 0; i < characters.length; i++) {
    var gifButtons = $("<button>");
    gifButtons.attr("data-character", characters[i]).text(characters[i]);
    console.log(gifButtons);
    $("#buttonslist").append(gifButtons);
  }

  // Event listener on click - make call to AJAX and display gifs
  // api call
  // then append in a for loop
  $("button").on("click", function() {
    console.log("this");
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
          gifDiv.append(characterImg);
          gifDiv.append(p);
          $("#giflist").prepend(gifDiv);
        }
      }
    });
  });
});



// add event listener to play and pause gifs for on click of the gif
// if not working check button function above and change class/id to be specific to submit vs gif buttons

// take user input and on click function, generate and push button to initial button array
