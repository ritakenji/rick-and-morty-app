import { fetchCharacters, currentPage, maxPages } from "../../index.js";

/* const navigation = document.querySelector('[data-js="navigation"]'); */
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> VERSION (A) <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
/* fetchCharacters(currentPage); */
export function handleSubmitButtons() {
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      fetchCharacters();
    }
  });
  nextButton.addEventListener("click", () => {
    if (currentPage < maxPages) {
      currentPage++;
      fetchCharacters(currentPage);
    }
  });
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> VERSION (B) <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

/* fetchCharacters().then((data) => {
let maxPages = data.info.pages; //needs to be able to change
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
