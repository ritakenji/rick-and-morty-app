const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";

async function fetchCharacters() {
  const url = "https://rickandmortyapi.com/api/character";
  try {
    const response = await fetch(url);
    console.log("Response: ", response);

    const data = await response.json();
    console.log("Data: ", data);

    if (!response.ok) {
      throw new Error(`Request failed with status code: ${response.status}`);
    }
    return await data;
  } catch (error) {
    return { error: error.message };
  }
}
console.log(fetchCharacters());
