import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";
import { handleSubmitButtons } from "./components/NavButton/NavButton.js";
import { handleSearchBar } from "./components/SearchBar/SearchBar.js";
import { pagination } from "./components/NavPagination/NavPagination.js";

export const cardContainer = document.querySelector(
  '[data-js="card-container"]'
);

export let currentPage = 1; // changed to let cause const cant be reassigned
export let maxPages; //needs to be able to change
export let searchQuery = "";

export async function fetchCharacters(currentPage) {
  cardContainer.innerHTML = " ";
  const url = `https://rickandmortyapi.com/api/character?page=${currentPage}&name=${searchQuery}`;
  try {
    const response = await fetch(url); //Once this promise resolves (the network request is finished), we call the .json method on the response variable.
    if (!response.ok) {
      throw new Error(`Request failed with status code: ${response.status}`);
    }
    const data = await response.json(); //This second promise resolves with the actual data (payload) converted from JSON (a formatted string) to a JavaScript value or object. This result is stored in the variable named data.
    maxPages = data.info.pages;

    // ***************************************** GET ELEMENTS & CREATE NEW CARD **************************************************************
    //  ↓ ↓ ↓ ↓ ↓ ↓ needs to be refactored
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

    pagination.textContent = `${currentPage} / ${maxPages}`;
    console.log(currentPage);

    // *********************************************** ERROR HANDLING **************************************************************
    //return data;we don't need it
  } catch (error) {
    console.error("Fetch error:", error.message);
    cardContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    //return { error: error.message }; we're not using the return value
  }
}

handleSubmitButtons();
handleSearchBar();

fetchCharacters();
