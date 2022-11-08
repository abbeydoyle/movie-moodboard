var searchButtonEl = document.querySelector("#search-button");
var mediaTypeEl = document.querySelector("#mv-tv");
var mediaInputVal = "";
var genreListEl = document.querySelector("#genres");
var genreInputVal = "";

var searchResults = [];

var requestUrl =
  "https://api.themoviedb.org/3/discover/movie?api_key=da2cce0ba3658a8b3c115c3c7c8178e5&sort_by=populatiry.desc&primary_release_year=2022&original_language=en&poster_path=&with_genres=35";

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


// Event listener
function handleSearch(event) {
  event.preventDefault();
  console.log("Search Button Clicked!");
  mediaInputVal = mediaTypeEl.value;
  genreInputVal = genreListEl.value;
  console.log("mediaInputVal: " + mediaInputVal);
  console.log("genreInputVal: " + genreInputVal);
}

searchButtonEl.addEventListener("click", handleSearch);
