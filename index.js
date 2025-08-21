import createCharacterCard from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States --> i changed the names of the variables here to make them more intuitive
const maxPages = 1; // total is 'data.info.pages'
const currentPage = 1;
const searchQuery = "";

async function fetchCharacters() {
  cardContainer.innerHTML = " ";
  const url =
    "https://rickandmortyapi.com/api/character" + `?page=${currentPage}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    /* const dataProperties = await data.results; */ //deleted this because 'data.results.forEach((ele...' reduces code

    data.results.forEach((element) => {
      const {
        image: imageSrc,
        name: characterName,
        status: characterDescription,
        type: characterType,
      } = element;
      const characterOccurence = element.episode.length;
      const newCard = createCharacterCard(
        imageSrc,
        characterName,
        characterDescription,
        characterType,
        characterOccurence
      );
      cardContainer.append(newCard);
    });
    // ******************************** ERROR HANDLING
    if (!response.ok) {
      throw new Error(`Request failed with status code: ${response.status}`);
    }
    return data; //changed here dataProperties to data because we need the whole obj not just the properties to be returned for task4
  } catch (error) {
    console.error("fetchData error:", error.message);
    return { error };
  }
}

fetchCharacters();
