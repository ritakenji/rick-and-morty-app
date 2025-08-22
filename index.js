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

// States 
let currentPage = 1; // changed to let cause const cant be reassigned
const searchQuery = "";

async function fetchCharacters(currentPage) {
  cardContainer.innerHTML = " ";
  const url = `https://rickandmortyapi.com/api/character?page=${currentPage}`; //this needs to be tested after merging
  try {
    const response = await fetch(url); //Once this promise resolves (the network request is finished), we call the .json method on the response variable.
    if (!response.ok) {
      throw new Error(`Request failed with status code: ${response.status}`);
    }
    const data = await response.json(); //This second promise resolves with the actual data (payload) converted from JSON (a formatted string) to a JavaScript value or object. This result is stored in the variable named data.

    // ***************************************** GET ELEMENTS & CREATE NEW CARD **************************************************************
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

    // *********************************************** ERROR HANDLING **************************************************************

    return data;
  } catch (error) {
    console.error("Fetch error:", error.message);
    cardContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    return { error: error.message };
  }
}

// *********************************************** PAGINATION *****************************************************************

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> VERSION 1 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

/* fetchCharacters().then((data) => {
const maxPages = data.info.pages; 
fetchCharacters();
prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchCharacters();
    pagination.textContent = `${currentPage} / ${maxPages}`;
  } else {
    prevButton.style.display = "none"; //this doesnt seem to work, probably because the button is already there on the html
    //prevButton.setAttribute("disabled", true); //another option
  }
});
nextButton.addEventListener("click", () => {
  if (currentPage < maxPages) {
    currentPage++;
    fetchCharacters();
    pagination.textContent = `${currentPage} / ${maxPages}`;
  } else {
    nextButton.style.display = "none"; //will test this after merging because im not about to click the button 42 times to find out lol
  }
}); */

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> OR VERSION 2 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const maxPages = 42;
fetchCharacters(currentPage);
prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchCharacters(currentPage);
    pagination.textContent = `${currentPage} / ${maxPages}`;
  } else {
    prevButton.style.display = "none"; //this doesnt seem to work, probably because the button is already there on the html
    //prevButton.setAttribute("disabled", true); //another option
  }
});
nextButton.addEventListener("click", () => {
  if (currentPage < maxPages) {
    currentPage++;
    fetchCharacters(currentPage);
    pagination.textContent = `${currentPage} / ${maxPages}`;
  } else {
    nextButton.style.display = "none"; //will test this after merging because im not about to click the button 42 times to find out lol
  }
});
