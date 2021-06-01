console.log("Content script loaded ...");

document.addEventListener("keydown", function (e) {
  console.log(e.metaKey);
});
