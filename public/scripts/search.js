const searchButton = document.getElementById("sb");
searchButton.addEventListener("click", toggleDisplay);

function toggleDisplay() {
    var searchPage = document.getElementById("search")
    searchPage.style.display = "flex";
}