console.log("background-script loaded...");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.value) {
    chrome.tabs.query({}, (tabs) => {
      sendResponse({ tabs });
    });
  }
  return true;
});
