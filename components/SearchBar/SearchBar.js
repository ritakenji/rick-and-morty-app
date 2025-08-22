import { fetchCharacters, searchQuery, currentPage, cardContainer  } from "../../index.js";

const searchBar = document.querySelector('[data-js="search-bar"]');

export function handleSearchBar () {
    searchBar.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    searchQuery = data.query;
    currentPage = 1;
    try {
      await fetchCharacters(currentPage);
    } catch (error) {
      console.error("Fetch error:", error.message);
      cardContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  }
);
};

