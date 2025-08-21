export default function createCharacterCard(
  imageSrc,
  characterName,
  characterDescription,
  characterType,
  characterOccurrence
) {
  const card = document.createElement("li");
  card.classList.add("card");
  card.innerHTML =
    '<div class="card__image-container">' +
    `<img class="card__image" src="${imageSrc}" alt="${characterName}"/>` +
    '<div class="card__image-gradient">' +
    "</div>" +
    "</div>" +
    '<div class="card__content">' +
    '<h2 class="card__title">' +
    `${characterName}` +
    "</h2>" +
    '<dl class="card__info">' +
    '<dt class="card__info-title">Status</dt>' +
    '<dd class="card__info-description">' +
    `${characterDescription}` +
    "</dd>" +
    '<dt class="card__info-title">Type</dt>' +
    '<dd class="card__info-description">' +
    `${characterType}` +
    "</dd>" +
    '<dt class="card__info-title">Occurrences</dt>' +
    '<dd class="card__info-description">' +
    `${characterOccurrence}` +
    "</dd>" +
    "</dl>" +
    "</div>";

  return card;
}
