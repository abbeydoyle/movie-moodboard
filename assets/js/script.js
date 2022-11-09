var searchButtonEl = document.querySelector("#search-button");
var mediaTypeEl = document.querySelector("#mv-tv");
var mediaInputVal = "";
var genreListMovieEl = document.querySelector("#genres-movie");
var genreListTvEl = document.querySelector("#genres-tv");
var genreInputVal = "";

var searchResults = [];

// ONLY MOVIE IS WORKING RIGHT NOW FOR API SEARCHES
function searchApi(mediaInputVal, genreInputVal) {
  var requestUrl =
    "https://api.themoviedb.org/3/discover/" +
    mediaInputVal +
    "?with_genres=" +
    genreInputVal +
    "sort_by=populatiry.desc&primary_release_year=2022&original_language=en&api_key=da2cce0ba3658a8b3c115c3c7c8178e5";

  fetch(requestUrl)
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
    });
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
