var searchButtonEl = document.querySelector("#search-button");
var mediaTypeEl = document.querySelector("#mv-tv");
var mediaInputVal = "";
var genreListMovieEl = document.querySelector("#genres-movie");
var genreListTvEl = document.querySelector("#genres-tv");
var genreInputVal = "";

var searchResults = [];

function searchApi(mediaInputVal, genreInputVal) {
  var requestUrl =
    "https://api.themoviedb.org/3/discover/" +
    mediaInputVal +
    "?api_key=da2cce0ba3658a8b3c115c3c7c8178e5&sort_by=popularity.desc&with_genres=" +
    genreInputVal +
    "&with_original_language=en";

  https: fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.results.length);
      for (var i = 0; i < data.results.length; i++) {
        searchResults.push(data.results[i]);
      }
      console.log(searchResults);
      populateCards();
    });
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
  console.log("Search Button Clicked!");
  mediaInputVal = mediaTypeEl.value;
  console.log("mediaInputVal: " + mediaInputVal);
  if (mediaInputVal === "movie") {
    genreInputVal = genreListMovieEl.value;
  } else if (mediaInputVal === "tv") {
    genreInputVal = genreListTvEl.value;
  } else {
    return;
  }

  console.log("genreInputVal: " + genreInputVal);

  searchApi(mediaInputVal, genreInputVal);
}

searchButtonEl.addEventListener("click", handleSearch);
