var data = [
      {
            "name": "a", 
            "age": 21
      },
      {
            "name": "ba", 
            "age": 21
      },
      {
            "name": "c", 
            "age": 25
      }
]

var cardTemplate = function(data){

      return `<div class="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
      <a
        href=""
        class="c-card block bg-white shadow-lg hover:shadow-xl rounded-lg overflow-hidden"
      >
        <div class="relative pb-48 overflow-hidden">
          <img
            class="absolute inset-0 h-full w-full object-cover"
            src="./assets/images/placeholder.png"
            alt=""
          />
        </div>
        <div class="p-4">
          <span
            class="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs"
            >${data.name}</span
          >
          <h2 class="mt-2 mb-2 font-bold">${data.age}</h2>
          <p class="text-sm">Movie Summary</p>
        </div>
      </a>
      </div>`
} 

var cards = ''
for(var i = 0; i < data.length; i++){
      cards += cardTemplate(data[i]);
}

document.getElementById('test').innerHTML = cards




///////

////////html card function


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

