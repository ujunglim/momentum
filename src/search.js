const searchForm = document.querySelector(".searchForm");
const searchInput = searchForm.querySelector("input")

const onSubmitSearch = (event) => {
  event.preventDefault();
  const value = searchInput.value;
  window.open(`https://www.google.com/search?q=${value}`);
  searchInput.value = "";
}

searchForm.addEventListener('submit', onSubmitSearch);