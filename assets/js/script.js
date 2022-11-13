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

// TODO: mat
$(document).ready(function () {
  retrieveLocalStorage();
  populateSearchList();
});

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
    $(".showCard").remove();

    populateCards();

    if (mediaInputVal === "movie") {
      var ratingUrl = "http://www.omdbapi.com/?apikey=3db2dcc5&t=";
      for (var i = 0; i < searchResults.length; i++) {
        const ratingSearch = await fetch(
          ratingUrl + searchResults[i].original_title
        );
        var ratingSearchData = await ratingSearch.json();

        searchResults[i].imdbRating = ratingSearchData.imdbRating;

        $(".search-rating").each(function (k) {
          if (searchResults[k].imdbRating) {
            $(this).text("IMDB Rating: " + searchResults[k].imdbRating);
          } else {
            $(this).text("IMDB Rating: N/A");
          }
        });

        $(".search-release").each(function (k) {
          if (!searchResults[k].release_date) {
            $(this).text("Release Date: N/A");
          }
        });
      }
    }

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

function populateCards() {
  for (var i = 0; i < searchResults.length; i++) {
    //populates title and release date for movies
    if (mediaInputVal === "movie") {
      var cardTemplate = function (data) {
        return `<div class="showCard w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
        <a
          href=""
          class="c-card block shadow-lg hover:shadow-xl rounded-lg overflow-hidden"
        >
          <div class="relative pb-48 overflow-hidden">
            <img
              class="search-image absolute inset-0 h-full w-full object-cover"
              src="https://image.tmdb.org/t/p/original/${searchResults[i].backdrop_path}"
              alt=""
            />
          </div>
          <div class="p-4 movieCard">
            <span
              class="search-release inline-block px-2 py-1 bg-orange-200 text-orange-800 leading-none rounded-full font-semibold uppercase tracking-wide text-xs"
              >${searchResults[i].release_date}</span
            >
            <span
              class="search-rating inline-block px-2 py-1 bg-orange-200 text-orange-800 leading-none rounded-full font-semibold uppercase tracking-wide text-xs"
              >Tomato Rating</span
            >
            <h2 class="search-title mt-2 mb-2 font-bold">
              ${searchResults[i].original_title}
            </h2>
            <p class="search-summary text-sm">
            ${searchResults[i].overview}
            </p>
          </div>
        </a>
      </div>`;
      };

      // populates title and first air date for tv (fields are named differently than when searching movies)
    } else if (mediaInputVal === "tv") {
      var cardTemplate = function (data) {
        return `<div class="showCard w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
        <a
          href=""
          class="c-card block shadow-lg hover:shadow-xl rounded-lg overflow-hidden"
        >
          <div class="relative pb-48 overflow-hidden">
            <img
              class="search-image absolute inset-0 h-full w-full object-cover"
              src="https://image.tmdb.org/t/p/original/${searchResults[i].backdrop_path}"
              alt=""
              
            />
          </div>
          <div class="p-4 movieCard">
            <span
              class="search-release inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs"
              >${searchResults[i].first_air_date}</span
            >
            <h2 class="search-title mt-2 mb-2 font-bold">
              ${searchResults[i].original_name}
            </h2>
            <p class="search-summary text-sm">
            ${searchResults[i].overview}
            </p>
          </div>
        </a>
      </div>`;
      };
    }
    $(".cardcontainer").append(cardTemplate);
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

  renderSearchHistory();

  renderColorScheme();

  // Resets the dropdown after the submit button is clicked
  mediaTypeEl.value = "";
  genreListMovieEl.value = "";
  genreListTvEl.value = "";
}

searchButtonEl.addEventListener("click", handleSearch);

function renderSearchHistory() {
  var genreInputName;

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
  } else if (genreInputVal === "35") {
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

  var searchHistory = genreInputName + " " + mediaInputName;
  var searchItem = searchHistory.valueOf();

  searches.push(searchHistory);
  localStorage.setItem("searches", JSON.stringify(searches));
  // TODO: mat
  retrieveLocalStorage();
  populateSearchList();
}

clearButtonEl.addEventListener(
  "click",
  function () {
    localStorage.clear();
    location.reload();
  },
  false
);

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

// TODO: mat
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

function renderColorScheme() {
  $(".movieImage").remove();
  $("header").addClass("text-[#bcbcbc]");
  $("#userSearch").addClass("text-[#bcbcbc]");
  $(".historyBlock").addClass("text-[#bcbcbc]");
  $(".movieCard").addClass("bg-[#bcbcbc] text-[#0a0d5e]");
  $("footer").addClass("text-[#bcbcbc]");

  if (genreInputVal === "28") {
    // action done
    $("#body").addClass(
      "bg-gradient-to-br from-[#721010] via-[#700024] to-[#0a0d5e]"
    );

    //adventure done
  } else if (genreInputVal === "12") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#042900] via-[#434400] to-[#674e02]"
    );
    //comedy done
  } else if (genreInputVal === "35") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#a11212] via-[#b55b00] to-[#b9af21]"
    );
    //horror done
  } else if (genreInputVal === "27") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#5d0510] via-[#2a0b0a] to-[#170303]"
    );
    // romance done
  } else if (genreInputVal === "10749") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#6e176c] via-[#760936] to-[#6e1722]"
    );
  } else if (genreInputVal === "18") {
    // drama done
    $("#body").addClass(
      "bg-gradient-to-br from-[#6e176c] via-[#760936] to-[#6e1722]"
    );
    //scifi done
  } else if (genreInputVal === "878") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#0c0f6e] via-[#292fd4] to-[#7a7a7a]"
    );
    $(".bubble").addClass("bg-orange-200 text-orange-800");
    //doc done
  } else if (genreInputVal === "99") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#0c0f6e] via-[#292fd4] to-[#7a7a7a]"
    );
    //mystery done
  } else if (genreInputVal === "9648") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#5d0510] via-[#2a0b0a] to-[#170303]"
    );
  } else if (genreInputVal === "10759") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#5d0510] via-[#2a0b0a] to-[#170303]"
    );
    //animation done
  } else if (genreInputVal === "35") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#a11212] via-[#b55b00] to-[#b9af21]"
    );
    //crime done
  } else if (genreInputVal === "80") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#5d0510] via-[#2a0b0a] to-[#170303]"
    );
    //family done
  } else if (genreInputVal === "10751") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#a11212] via-[#b55b00] to-[#b9af21]"
    );
  } else if (genreInputVal === "10762") {
    // kids done
    $("#body").addClass(
      "bg-gradient-to-br from-[#721010] via-[#700024] to-[#0a0d5e]"
    );
  } else if (genreInputVal === "10763") {
    // news done
    $("#body").addClass(
      "bg-gradient-to-br from-[#721010] via-[#700024] to-[#0a0d5e]"
    );
    //reality done
  } else if (genreInputVal === "10764") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#6e176c] via-[#760936] to-[#6e1722]"
    );
    //scifi fantasy done
  } else if (genreInputVal === "10765") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#0c0f6e] via-[#292fd4] to-[#7a7a7a]"
    );
    //soap done
  } else if (genreInputVal === "10766") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#6e176c] via-[#760936] to-[#6e1722]"
    );
    //talk dnoe
  } else if (genreInputVal === "10767") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#a11212] via-[#b55b00] to-[#b9af21]"
    );
  } else if (genreInputVal === "10768") {
    // war & politcs done
    $("#body").addClass(
      "bg-gradient-to-br from-[#721010] via-[#700024] to-[#0a0d5e]"
    );
    // western done
  } else if (genreInputVal === "37") {
    $("#body").addClass(
      "bg-gradient-to-br from-[#042900] via-[#434400] to-[#674e02]"
    );
  }
}
