import {cardPlaceInput, cardUrlInput} from "./utils.js";
import {closePopup, openImagePopup} from "./modal.js";
import {uploadCard} from "./api.js";

const cardsContainer = document.querySelector('.elements');

//функция создания элемента из template
function createCard(cardObject) {
  const cardTemplate = document.querySelector('.element-template').content;
  const newCard = cardTemplate.querySelector('.element').cloneNode(true);

  newCard.querySelector('.element__name').textContent = cardObject.name;
  newCard.querySelector('.element__image').alt = cardObject.name;
  newCard.querySelector('.element__image').src = cardObject.link;
  newCard.querySelector('.element__like-count').textContent = cardObject.likes.length;

  newCard.querySelector('.element__like').addEventListener('click', likeCard);
  newCard.querySelector('.element__delete').addEventListener('click', deleteCard);
  newCard.querySelector('.element__image').addEventListener('click', openImagePopup);

  return newCard;
}

//функция добавления созданного элемента в разметку
function addCard(cardObject) {
  cardsContainer.prepend(createCard(cardObject));
}


//обработчик отправки формы добавления элемента
function cardSubmitHandler(evt) {
  evt.preventDefault();
  const cardObject = {
    "name": cardPlaceInput.value,
    "link": cardUrlInput.value
  }
  uploadCard(cardObject)
    .then((newCard) => {
      console.log(newCard);
      addCard(newCard);
    });
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
