const addBookmarkBtn = document.getElementById("add-bookmark");
const bookmarkList = document.getElementById("bookmark-list");
const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.getElementById("bookmark-url");

document.addEventListener("DOMContentLoaded", loadBookmarks);

addBookmarkBtn.addEventListener("click", function () {
  const name = bookmarkNameInput.value.trim();
  const url = bookmarkUrlInput.value.trim();
  if (name === "" || url === "") {
    alert("Please enter both name and URL.");
  } else {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      alert("Please enter a valid URL starting with http:// or https://");
      return;
    }
    displayBookmarks(name, url);
    saveBook(name, url);

    bookmarkNameInput.value = "";
    bookmarkUrlInput.value = "";
  }
});

function displayBookmarks(name, url) {
  let link = document.createElement("a");
  let li = document.createElement("li");

  link.href = url;
  link.textContent = name;
  link.target = "_blank";

  const removeButton = document.createElement("button");
  removeButton.innerText = "remove";
  removeButton.addEventListener("click", function () {
    bookmarkList.removeChild(li);
    removeBookmarkFromStorage(name, url);
  });

  li.appendChild(link);
  li.appendChild(removeButton);

  bookmarkList.appendChild(li);
}
function getBookmarksFromStroge() {
  const bookmark = localStorage.getItem("bookmarks");
  return bookmark ? JSON.parse(bookmark) : [];
}

function saveBook(name, url) {
  const bookmark = getBookmarksFromStroge();
  bookmark.push({ name, url });
  localStorage.setItem("bookmarks", JSON.stringify(bookmark));
}

function loadBookmarks() {
  const bookmark = getBookmarksFromStroge();
  bookmark.forEach(function (bookmark) {
    displayBookmarks(bookmark.name, bookmark.url);
  });
}

function removeBookmarkFromStorage(name, url) {
  let bookmark = getBookmarksFromStroge();
  bookmark = bookmark.filter(
    (bookmark) => bookmark.name !== name || bookmark.url !== url,
  );
  localStorage.setItem("bookmarks",JSON.stringify(bookmark))
}
