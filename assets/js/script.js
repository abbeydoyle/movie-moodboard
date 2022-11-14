// decalare local variables
var searchButtonEl = document.querySelector("#search-button");
var clearButtonEl = document.querySelector("#clearButton");
var mediaTypeEl = document.querySelector("#mv-tv");
var mediaInputVal = "";
var genreListMovieEl = document.querySelector("#genres-movie");
var genreListTvEl = document.querySelector("#genres-tv");
var genreInputVal = "";
var searches = [];
var searchHistory;
var searchResults = [];
var ratingResults = [];

// retrieve and display local storage with webpage open
$(document).ready(function () {
  retrieveLocalStorage();
  populateSearchList();
});

// api fetch function
async function searchApi(mediaInputVal, genreInputVal) {
  try {
    var genreSearch = "";
    const requestUrl =
      "https://api.themoviedb.org/3/discover/" +
      mediaInputVal +
      "?api_key=da2cce0ba3658a8b3c115c3c7c8178e5&sort_by=popularity.desc&with_genres=" +
      genreInputVal +
      "&with_original_language=en";
    genreSearch = await fetch(requestUrl);
    var genreSearchData = await genreSearch.json();
    searchResults = genreSearchData.results;
    $(".showCard").remove();

    // display card function with fetched data
    populateCards();

    // use second api for IMDB movie ratings
    if (mediaInputVal === "movie") {
      var ratingUrl = "https://www.omdbapi.com/?apikey=3db2dcc5&t=";
      for (var i = 0; i < searchResults.length; i++) {
        const ratingSearch = await fetch(ratingUrl + searchResults[i].title);
        var ratingSearchData = await ratingSearch.json();

        searchResults[i].imdbRating = ratingSearchData.imdbRating;

        // shows N/A for IMDB rating if the value isn't available in the API request
        $(".search-rating").each(function (k) {
          if (searchResults[k].imdbRating) {
            $(this).text("IMDB Rating: " + searchResults[k].imdbRating);
          } else {
            $(this).text("IMDB Rating: N/A");
          }
        });

        // shows N/A for the release date if the value isn't availble in the API request
        $(".search-release").each(function (k) {
          if (!searchResults[k].release_date) {
            $(this).text("Release Date: N/A");
          }
        });
      }
    }

    // uses the poster path image if the backdrop path image isn't available in the API request
    $(".search-image").each(function (k) {
      if (searchResults[k].backdrop_path == null) {
        $(this).attr(
          "src",
          "https://image.tmdb.org/t/p/original/" + searchResults[k].poster_path
        );
      }
    });

    // Resets the searchApi input variables and array after the cards are populated so the user can search again
    mediaInputVal = "";
    genreInputVal = "";
    searchResults = [];
    ratingResults = [];
  } catch (error) {
    console.log("Error: " + error);
  }
}

//populate cards with fetched data using a varred html tailwind card template on loop
function populateCards() {
  for (var i = 0; i < searchResults.length; i++) {
    //populates title and release date for movies
    if (mediaInputVal === "movie") {
      var cardTemplate = function (data) {
        return `<div class="showCard w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
        <div
          class="c-card block shadow-lg hover:shadow-xl rounded-lg overflow-hidden"
        >
          <div class="relative pb-48 overflow-hidden">
            <img
              class="search-image absolute inset-0 h-full w-full object-cover"
              src="https://image.tmdb.org/t/p/original/${searchResults[i].backdrop_path}"
              alt="Movie poster image"
            />
          </div>
          <div class="p-4 movieCard">
            <span
              class="search-release inline-block px-2 py-1 bg-red-200 text-red-800 leading-none rounded-full font-semibold uppercase tracking-wide text-xs"
              >${searchResults[i].release_date}</span
            >
            <span
              class="search-rating inline-block px-2 py-1 bg-red-200 text-red-800 leading-none rounded-full font-semibold uppercase tracking-wide text-xs"
              ></span
            >
            <h2 class="search-title mt-2 mb-2 font-bold">
              ${searchResults[i].title}
            </h2>
            <p class="search-summary text-sm">
            ${searchResults[i].overview}
            </p>
          </div>
        </div>
      </div>`;
      };

      // populates title and first air date for tv (fields are named differently than when searching movies)
    } else if (mediaInputVal === "tv") {
      var cardTemplate = function (data) {
        return `<div class="showCard w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
        <div
          class="c-card block shadow-lg hover:shadow-xl rounded-lg overflow-hidden"
        >
          <div class="relative pb-48 overflow-hidden">
            <img
              class="search-image absolute inset-0 h-full w-full object-cover"
              src="https://image.tmdb.org/t/p/original/${searchResults[i].backdrop_path}"
              alt="TV Show poster image"
              
            />
          </div>
          <div class="p-4 movieCard">
            <span
              class="search-release inline-block px-2 py-1 leading-none bg-red-200 text-red-800 rounded-full font-semibold uppercase tracking-wide text-xs"
              >${searchResults[i].first_air_date}</span
            >
            <h2 class="search-title mt-2 mb-2 font-bold">
              ${searchResults[i].name}
            </h2>
            <p class="search-summary text-sm">
            ${searchResults[i].overview}
            </p>
          </div>
        </div>
      </div>`;
      };
    }
    //add card template to the container html element
    $(".cardcontainer").append(cardTemplate);
  }
}

// Event listener search button
function handleSearch(event) {
  event.preventDefault();
  mediaInputVal = mediaTypeEl.value;
  if (mediaInputVal === "movie") {
    genreInputVal = genreListMovieEl.value;
  } else if (mediaInputVal === "tv") {
    genreInputVal = genreListTvEl.value;
  } else {
    return;
  }

  searchApi(mediaInputVal, genreInputVal);

  renderSearchHistory();

  renderColorScheme();

  // Resets the dropdown after the submit button is clicked
  mediaTypeEl.value = "";
  genreListMovieEl.value = "";
  genreListTvEl.value = "";
}

// Handle search function occurs when the search button is clicked
searchButtonEl.addEventListener("click", handleSearch);

// display search history based on user input
function renderSearchHistory() {
  var genreInputName;

  // must translate api numeric data to genre for display
  if (genreInputVal === "28") {
    genreInputName = "Action";
  } else if (genreInputVal === "12") {
    genreInputName = "Adventure";
  } else if (genreInputVal === "35") {
    genreInputName = "Comedy";
  } else if (genreInputVal === "27") {
    genreInputName = "Horror";
  } else if (genreInputVal === "10749") {
    genreInputName = "Romance";
  } else if (genreInputVal === "18") {
    genreInputName = "Drama";
  } else if (genreInputVal === "878") {
    genreInputName = "Sci-Fi";
  } else if (genreInputVal === "99") {
    genreInputName = "Documentary";
  } else if (genreInputVal === "9648") {
    genreInputName = "Mystery";
  } else if (genreInputVal === "10759") {
    genreInputName = "Action & Adventure";
  } else if (genreInputVal === "16") {
    genreInputName = "Animation";
  } else if (genreInputVal === "80") {
    genreInputName = "Crime";
  } else if (genreInputVal === "10751") {
    genreInputName = "Family";
  } else if (genreInputVal === "10762") {
    genreInputName = "Kids";
  } else if (genreInputVal === "10763") {
    genreInputName = "News";
  } else if (genreInputVal === "10764") {
    genreInputName = "Reality";
  } else if (genreInputVal === "10765") {
    genreInputName = "Sci-Fi & Fantasy";
  } else if (genreInputVal === "10766") {
    genreInputName = "Soap";
  } else if (genreInputVal === "10767") {
    genreInputName = "Talk";
  } else if (genreInputVal === "10768") {
    genreInputName = "War & Politics";
  } else if (genreInputVal === "37") {
    genreInputName = "Western";
  }

  var mediaInputName;

  if (mediaInputVal === "movie") {
    mediaInputName = "Movie";
  } else if (mediaInputVal === "tv") {
    mediaInputName = "TV Show";
  }

  // append assembled search history to page and add to local storage
  var searchHistory = genreInputName + " " + mediaInputName;
  var searchItem = searchHistory.valueOf();

  searches.push(searchHistory);
  localStorage.setItem("searches", JSON.stringify(searches));
  retrieveLocalStorage();
  populateSearchList();
}

// event listener clear search history button and function
clearButtonEl.addEventListener(
  "click",
  function () {
    localStorage.clear();
    location.reload();
  },
  false
);

// append search history to ul html element
function populateSearchList() {
  var searchHistoryList = document.getElementById("searchBlock");
  searchHistoryList.innerHTML = "";
  for (let i = searches.length - 1; i >= 0; i--) {
    var searchTerm = searches[i];
    var searchTermElement = document.createElement("li");
    searchTermElement.setAttribute("class", "search-history-li p-2");

    searchTermElement.textContent = searchTerm;
    searchHistoryList.append(searchTermElement);
  }
}

// retrieves local storage and adds to empty array
function retrieveLocalStorage() {
  searches = JSON.parse(localStorage.getItem("searches")) || [];
}

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

// creates custom color scheme based off genre input using tailwind classes
function renderColorScheme() {
  // remove opening page image and add text colors and card background colors
  //stays the same regardless of genre
  $(".movieImage").remove();
  $("header").addClass("text-[#bcbcbc]");
  $("#userSearch").addClass("text-[#bcbcbc]");
  $(".historyBlock").addClass("text-[#bcbcbc]");
  $(".movieCard").addClass("bg-[#bcbcbc] text-[#0a0d5e]");
  $("footer").addClass("text-[#bcbcbc]");

  if (genreInputVal === "28") {
    // action
    $("#body").addClass(
      "bg-gradient-to-br from-[#721010] via-[#700024] to-[#0a0d5e]"
    );
    //adventure
  } else if (genreInputVal === "12") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#042900] via-[#434400] to-[#674e02]"
    );
    //comedy
  } else if (genreInputVal === "35") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#a11212] via-[#b55b00] to-[#b9af21]"
    );
    //horror
  } else if (genreInputVal === "27") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#5d0510] via-[#2a0b0a] to-[#170303]"
    );
    // romance
  } else if (genreInputVal === "10749") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#6e176c] via-[#760936] to-[#6e1722]"
    );
    // drama
  } else if (genreInputVal === "18") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#6e176c] via-[#760936] to-[#6e1722]"
    );
    //scif
  } else if (genreInputVal === "878") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#0c0f6e] via-[#292fd4] to-[#7a7a7a]"
    );
    //doc
  } else if (genreInputVal === "99") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#0c0f6e] via-[#292fd4] to-[#7a7a7a]"
    );
    //mystery
  } else if (genreInputVal === "9648") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#5d0510] via-[#2a0b0a] to-[#170303]"
    );
    //action & adventure
  } else if (genreInputVal === "10759") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#5d0510] via-[#2a0b0a] to-[#170303]"
    );
    //animation
  } else if (genreInputVal === "35") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#a11212] via-[#b55b00] to-[#b9af21]"
    );
    //crime
  } else if (genreInputVal === "80") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#5d0510] via-[#2a0b0a] to-[#170303]"
    );
    //family done
  } else if (genreInputVal === "10751") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#a11212] via-[#b55b00] to-[#b9af21]"
    );
    // kids
  } else if (genreInputVal === "10762") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#721010] via-[#700024] to-[#0a0d5e]"
    );
    // news
  } else if (genreInputVal === "10763") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#721010] via-[#700024] to-[#0a0d5e]"
    );
    //reality
  } else if (genreInputVal === "10764") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#6e176c] via-[#760936] to-[#6e1722]"
    );
    //scifi fantasy
  } else if (genreInputVal === "10765") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#0c0f6e] via-[#292fd4] to-[#7a7a7a]"
    );
    //soap
  } else if (genreInputVal === "10766") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#6e176c] via-[#760936] to-[#6e1722]"
    );
    //talk
  } else if (genreInputVal === "10767") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#a11212] via-[#b55b00] to-[#b9af21]"
    );
    // war & politcs
  } else if (genreInputVal === "10768") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#721010] via-[#700024] to-[#0a0d5e]"
    );
    // western
  } else if (genreInputVal === "37") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#042900] via-[#434400] to-[#674e02]"
    );
  }
}
