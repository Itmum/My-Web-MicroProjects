const bookmarkNameEl = document.getElementById("bookmark-name");
const bookmarkUrlEl = document.getElementById("bookmark-url");
const addBookmarkBtn = document.getElementById("add-bookmark");
const bookmarkList = document.getElementById("bookmark-list");

let bookmarks = JSON.parse(localStorage.getItem("bookmarkStorage")) || [];

addBookmarkBtn.addEventListener("click", addBookmark);

function addBookmark() {
	if (bookmarkNameEl.value === "" || bookmarkUrlEl.value === "") {
		alert("Pleas fill both Bookmark Name and URL");
	} else {
		if (bookmarkUrlEl.value.startsWith("http://") || bookmarkUrlEl.value.startsWith("https://")) {
			listBookmark();
		} else {
			alert("URL must start with http:// or https://");
		}
	}
}

function listBookmark() {
	const name = bookmarkNameEl.value.trim();
	const url = bookmarkUrlEl.value.trim();

	const bookMarkObj = {
		name: name,
		url: url,
	};
	bookmarks.push(bookMarkObj);
	localStorage.setItem("bookmarkStorage", JSON.stringify(bookmarks));
	// creatList(name, url);
	displayList();
	bookmarkNameEl.value = "";
	bookmarkUrlEl.value = "";
}

function displayList() {
	bookmarkList.innerHTML = "";
	[...bookmarks].forEach((item, index) => {
		creatListItem(item.name, item.url, index);
	});
}

function creatListItem(name, url, index) {
	const li = document.createElement("li");
	const link = document.createElement("a");
	const btn = document.createElement("button");

	link.href = url;
	link.textContent = name;
	link.target = "_blank";

	btn.textContent = "Remove";

	li.appendChild(link);
	li.appendChild(btn);
	bookmarkList.appendChild(li);

	btn.addEventListener("click", () => {
		// bookmarkList.removeChild(li);
		removeFromStorage(index);
	});
}

function removeFromStorage(index) {
	bookmarks = [...bookmarks].filter((item, i) => i !== index);
	localStorage.setItem("bookmarkStorage", JSON.stringify(bookmarks));
	displayList();
}

displayList();
