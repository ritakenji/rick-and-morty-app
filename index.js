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
let maxPages = 1; // changed to let cause const cant be reassigned
let currentPage = 1;
const searchQuery = "";

async function fetchCharacters() {
  cardContainer.innerHTML = " ";
  const url =
    "https://rickandmortyapi.com/api/character" + `?page=${currentPage}`; //this needs to be tested after merging
  try {
    const response = await fetch(url); //Once this promise resolves (the network request is finished), we call the .json method on the response variable.
    if (!response.ok) {
      throw new Error(`Request failed with status code: ${response.status}`);
    }
    const data = await response.json(); //This second promise resolves with the actual data (payload) converted from JSON (a formatted string) to a JavaScript value or object. This result is stored in the variable named data.

    // ***************************************** GET ELEMENTS & CREATE NEW CARD **************************************************************
    data.results.forEach((element) => {
      /* const dataProperties = await data.results; */ //deleted this because 'data.results.forEach((ele...' reduces code
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

    return data; //changed here dataProperties to data because we need the whole obj not just the properties to be returned for task4
  } catch (error) {
    console.error("Fetch error:", error.message);
    cardContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    return { error: error.message };
  }
}

// *********************************************** PAGINATION *****************************************************************
fetchCharacters().then((data) => {
  //checked out the handout+asked gemini and found this solution to using data outside of fetchcharacter function
  // data returned by the fetch
  maxPages = data.info.pages;
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
  });
});
