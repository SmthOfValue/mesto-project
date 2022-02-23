import {cardPlaceInput, cardUrlInput} from "./utils.js";
import {closePopup, openImagePopup} from "./modal.js";

//функция создания элемента из template
function createCard(cardObject) {
  const cardTemplate = document.querySelector('.element-template').content;
  const newCard = cardTemplate.querySelector('.element').cloneNode(true);

  newCard.querySelector('.element__name').textContent = cardObject.cardName;
  newCard.querySelector('.element__image').alt = cardObject.cardName;
  newCard.querySelector('.element__image').src = cardObject.cardSource;

  newCard.querySelector('.element__like').addEventListener('click', likeCard);
  newCard.querySelector('.element__delete').addEventListener('click', deleteCard);
  newCard.querySelector('.element__image').addEventListener('click', openImagePopup);

  return newCard;
}

//функция добавления созданного элемента в разметку
function addCard(cardObject) {
  const cardsContainer = document.querySelector('.elements');
  cardsContainer.prepend(createCard(cardObject));
}


//обработчик отправки формы добавления элемента


function cardSubmitHandler(evt) {
  evt.preventDefault();
  const cardObject = {
    'cardName': cardPlaceInput.value,
    'cardSource': cardUrlInput.value
}
  addCard(cardObject);
  cardPlaceInput.value = '';
  cardUrlInput.value = '';
  closePopup(evt);
}

//обработчик кнопки удаления элементов
function deleteCard(evt) {
  evt.target.closest('.element').remove();
}

//обработчик кнопки like
function likeCard(evt) {
  evt.target.closest('.element__like').classList.toggle('element__like_active');
}

export {cardSubmitHandler, addCard};
