const addButton=document.querySelector('.profile__add');

function popupOpen() {
  const popup = document.querySelector('#card-add-popup');

  popup.classList.add('popup_opened');
  popup.style.opacity = 1;
}

addButton.addEventListener('click', popupOpen);

function createCard(cardObject) {
const cardTemplate = document.querySelector('.element-template').content;
const newCard = cardTemplate.querySelector('.element').cloneNode(true);


newCard.querySelector('.element__name').textContent = cardObject.cardName;
newCard.querySelector('.element__image').alt = cardObject.cardName;
newCard.querySelector('.element__image').src = cardObject.cardSource;

return newCard;
}

function addCard(cardObject) {
  const cardsContainer = document.querySelector('.elements');
  cardsContainer.append(createCard(cardObject));
  updateLikeButtons();
  updateDeleteButtons();
}

