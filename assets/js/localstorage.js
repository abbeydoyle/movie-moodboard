//  Search history function
// Works with localStorage to keep the history list updated on new page loads
// Also connects to search button and form submit
// Runs on page load and on search button click

function updateLocalStorage(mediaInputVal, genreInputVal) {
  let searchHistory = [];
  if (localStorage.getItem("search_history")) {
    searchHistory = JSON.parse(localStorage.getItem("search_history"));
  }

  /* Check if search history already includes this term */
  if (searchHistory.includes(newSearchTerm)) {
    return;
  } else if (newSearchTerm && newSearchTerm.length > 0) {
    /* If there is a new term, add it to the search history */
    searchHistory.push(newSearchTerm);
    localStorage.setItem("search_history", JSON.stringify(searchHistory));
  }
  return searchHistory;
}

//  Update the element on page with list of search history
function updateSearchHistoryList(searchHistory) {
  var searchHistoryList = $("#search-history-list");
  searchHistoryList.empty();
  for (let i = 0; i < searchHistory.length; i++) {
    var searchTerm = searchHistory[i];
    var searchTermElement = $("<li>").attr("data-search", searchTerm);

    searchTermElement.text(searchTerm);
    searchHistoryList.append(searchTermElement);
    searchTermElement.on("click", function () {
      mealSearch($(this).attr("data-search"));
    });
  }
}

var search_history = updateLocalStorage();
