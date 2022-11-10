var searchButtonEl = document.querySelector("#search-button");
var mediaTypeEl = document.querySelector("#mv-tv");
var mediaInputVal = "";
var genreListMovieEl = document.querySelector("#genres-movie");
var genreListTvEl = document.querySelector("#genres-tv");
var genreInputVal = "";

var searchResults = [];
var ratingResults = [];

async function searchApi(mediaInputVal, genreInputVal) {
  try {
    var genreSearch = "";
    // console.log(mediaInputVal);
    // console.log(genreInputVal);
    const requestUrl =
      "https://api.themoviedb.org/3/discover/" +
      mediaInputVal +
      "?api_key=da2cce0ba3658a8b3c115c3c7c8178e5&sort_by=popularity.desc&with_genres=" +
      genreInputVal +
      "&with_original_language=en";
    genreSearch = await fetch(requestUrl);
    var genreSearchData = await genreSearch.json();
    searchResults = genreSearchData.results;
    // console.log(searchResults);
    populateCards();
    if (mediaInputVal === "movie") {
      var ratingUrl = "http://www.omdbapi.com/?apikey=3db2dcc5&t=";
      for (var i = 0; i < searchResults.length; i++) {
        const ratingSearch = await fetch(
          ratingUrl + searchResults[i].original_title
        );
        var ratingSearchData = await ratingSearch.json();

        // console.log(ratingSearchData);
        searchResults[i].imdbRating = ratingSearchData.imdbRating;

        $(".search-rating").each(function (k) {
          $(this).text("IMDB Rating: " + searchResults[k].imdbRating);
          $(this).addClass("visible").removeClass("invisible");
        });
      }
    }
    // Resets the searchApi input variables and array after the cards are populated so the user can search again
    mediaInputVal = "";
    genreInputVal = "";
    searchResults = [];
  } catch (error) {
    console.log("Error: " + error);
  }
}

function populateCards() {
  for (var i = 0; i < searchResults.length; i++) {
    //populates title and release date for movies
    if (mediaInputVal === "movie") {
      $(".search-title").each(function (i) {
        $(this).text(searchResults[i].original_title);
      });
      $(".search-release").each(function (i) {
        $(this).text(searchResults[i].release_date);
      });

      // populates title and first air date for tv (fields are named differently than when searching movies)
    } else if (mediaInputVal === "tv") {
      $(".search-title").each(function (i) {
        $(this).text(searchResults[i].original_name);
      });
      $(".search-release").each(function (i) {
        $(this).text(searchResults[i].first_air_date);
      });
    }

    // populates summary for both movies and tv
    $(".search-summary").each(function (i) {
      $(this).text(searchResults[i].overview);
    });

    // populates the images for both movies and tv
    $(".search-image").each(function (i) {
      $(this).attr(
        "src",
        "https://image.tmdb.org/t/p/original/" + searchResults[i].poster_path
      );
    });
  }
}

// Event listener
function handleSearch(event) {
  event.preventDefault();
  // console.log("Search Button Clicked!");
  mediaInputVal = mediaTypeEl.value;
  // console.log("mediaInputVal: " + mediaInputVal);
  if (mediaInputVal === "movie") {
    genreInputVal = genreListMovieEl.value;
  } else if (mediaInputVal === "tv") {
    genreInputVal = genreListTvEl.value;
  } else {
    // console.log("EXIT");
    return;
  }

  // console.log("genreInputVal: " + genreInputVal);

  searchApi(mediaInputVal, genreInputVal);

  // Resets the dropdown after the submit button is clicked
  mediaTypeEl.value = "";
  genreListMovieEl.value = "";
  genreListTvEl.value = "";
}

searchButtonEl.addEventListener("click", handleSearch);

// Event listener for format dropdown to control if the movie or tv genre dropdown is shown
$("#mv-tv").change(function () {
  var selectedFormat = $(this).val();
  if (selectedFormat === "movie") {
    $("#genres-movie").addClass("block").removeClass("hidden");
    $("#genres-tv").addClass("hidden").removeClass("block");
  } else if (selectedFormat === "tv") {
    $("#genres-tv").addClass("block").removeClass("hidden");
    $("#genres-movie").addClass("hidden").removeClass("block");
  } else {
    return;
  }
});
