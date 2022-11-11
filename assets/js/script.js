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

      var cardTemplate = function(data){

        return `<div class="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
        <a
          href=""
          class="c-card block shadow-lg hover:shadow-xl rounded-lg overflow-hidden"
        >
          <div class="relative pb-48 overflow-hidden">
            <img
              class="search-image absolute inset-0 h-full w-full object-cover"
              src="assets/images/placeholder.png"
              alt=""
            />
          </div>
          <div class="p-4 movieCard">
            <span
              class="search-release inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs"
              >${searchResults[i].release_date}</span
            >
            <span
              class="search-rating inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs"
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
      </div>`
      }


      // populates title and first air date for tv (fields are named differently than when searching movies)
    } else if (mediaInputVal === "tv") {

      var cardTemplate = function(data){

        return `<div class="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4 bg-[#bcbcbc]" id = "movieCard">
        <a
          href=""
          class="c-card block shadow-lg hover:shadow-xl rounded-lg overflow-hidden"
        >
          <div class="relative pb-48 overflow-hidden">
            <img
              class="search-image absolute inset-0 h-full w-full object-cover"
              src="assets/images/placeholder.png"
              alt=""
            />
          </div>
          <div class="p-4">
            <span
              class="search-release inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs"
              >${searchResults[i].first_air_date}</span
            >
            <span
              class="search-rating inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs"
              >Tomato Rating</span
            >
            <h2 class="search-title mt-2 mb-2 font-bold">
              ${searchResults[i].original_name}
            </h2>
            <p class="search-summary text-sm">
            ${searchResults[i].overview}
            </p>
          </div>
        </a>
      </div>`
      }
    }

    // populates summary for both movies and tv
    // $(".search-summary").each(function (i) {
    //   $(this).text(searchResults[i].overview);
    // });

    // // populates the images for both movies and tv
    // $(".search-image").each(function (i) {
    //   $(this).attr(
    //     "src",
    //     "https://image.tmdb.org/t/p/original/" + searchResults[i].poster_path
    //   );
    // });
//     var cards = ''
//     for(var i = 0; i < data.length; i++){
//       cards += cardTemplate(data[i]);
// }

$(".cardcontainer").append(cardTemplate);
// document.getElementById('test').innerHTML = cardTemplate
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
    genreInputName = "Action"
  }
  else if (genreInputVal === "12") {
    genreInputName = "Adventure"
  }
  else if (genreInputVal === "35") {
    genreInputName = "Comedy"
  }
  else if (genreInputVal === "27") {
    genreInputName = "Horror"
  }
  else if (genreInputVal === "10749") {
    genreInputName = "Romance"
  }
  else if (genreInputVal === "18") {
    genreInputName = "Drama"
  }
  else if (genreInputVal === "878") {
    genreInputName = "Sci-Fi"
  }
  else if (genreInputVal === "99") {
    genreInputName = "Documentary"
  }
  else if (genreInputVal === "9648") {
    genreInputName = "Mystery"
  }
  else if (genreInputVal === "35") {
    genreInputName = "Animation"
  }
  else if (genreInputVal === "80") {
    genreInputName = "Crime"
  }
  else if (genreInputVal === "10751") {
    genreInputName = "Family"
  }
  else if (genreInputVal === "10762") {
    genreInputName = "Kids"
  }
  else if (genreInputVal === "10763") {
    genreInputName = "News"
  }
  else if (genreInputVal === "10764") {
    genreInputName = "Reality"
  }
  else if (genreInputVal === "10765") {
    genreInputName = "Sci-Fi & Fantasy"
  }
  else if (genreInputVal === "10766") {
    genreInputName = "Soap"
  }
  else if (genreInputVal === "10767") {
    genreInputName = "Talk"
  }
  else if (genreInputVal === "10768") {
    genreInputName = "War & Politics"
  }
  else if (genreInputVal === "37") {
    genreInputName = "Western"
  }

  var mediaInputName;

  if (mediaInputVal === "movie") {
    mediaInputName = "Movie"
  } else {
    mediaInputName = "TV Show"
  }

  var searchHistory = genreInputName + " " + mediaInputName;
  var searchItem = searchHistory.valueOf()

  $(".historyBlock").append(searchItem);

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
  if (genreInputVal === "28") {
    $("#body").addClass("bg-gradient-to-br from-[#721010] via-[#700024] to-[#0a0d5e]")
    $("header").addClass("text-[#bcbcbc]")
    $("#userSearch").addClass("text-[#bcbcbc]")
    $(".historyBlock").addClass("text-[#bcbcbc]")
    $(".movieCard").addClass("bg-[#bcbcbc] text-[#0a0d5e]")
    $("footer").addClass("text-[#bcbcbc]")
    // $("p").addClass("text-[#bcbcbc]")
    // $(".searchSummary").addClass("text-blue-700")
    // $(".searchTitle").addClass("text-blue-700")
  }
  else if (genreInputVal === "12") {
    genreInputName = "Adventure"
  }
}

//
