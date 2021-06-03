console.log("Content script loaded ...");
const body = document.querySelector("body");
const overlayEl = document.createElement("div");
const tabSearchWrapper = document.createElement("div");
const tabSearchInput = document.createElement("input");
const tabSearchResults = document.createElement("div");

const initUI = () => {
  // Create overlay
  overlayEl.setAttribute("class", "tab-overlay");

  // Set attributes for search wrapper
  tabSearchWrapper.setAttribute("class", "tab-search-wrapper");

  // Set attributes of search result wrapper
  tabSearchResults.setAttribute("class", "tab-search-results-wrapper");

  // Set attributes for input
  tabSearchInput.setAttribute("type", "text");
  tabSearchInput.setAttribute("class", "tab-search");
  tabSearchInput.setAttribute("placeholder", "What tab are you looking for?");

  // Insert new elements into DOM
  tabSearchWrapper.append(tabSearchInput);
  tabSearchWrapper.append(tabSearchResults);
  overlayEl.append(tabSearchWrapper);
  body.append(overlayEl);
};

initUI();

function truncate(text, length) {
  return text.length > length ? text.substr(0, length - 1) + "..." : text;
}

document.addEventListener("keydown", function (e) {
  if (e.metaKey && e.key === "k") {
    overlayEl.classList.toggle("visible");
    tabSearchInput.value = "";
    tabSearchInput.focus();
  }
});

tabSearchInput.addEventListener("keydown", function (e) {
  // Clear current list
  tabSearchResults.innerHTML = "";

  // Get current search value
  const searchValue = tabSearchInput.value;
  // Request the current tabs
  chrome.runtime.sendMessage({ value: searchValue }, function (response) {
    response.tabs.map((tab) => {
      const searchItem = document.createElement("div");
      searchItem.setAttribute("class", "search-item");
      searchItem.innerHTML = truncate(tab.title, 75);
      tabSearchResults.append(searchItem);
    });
  });
});
