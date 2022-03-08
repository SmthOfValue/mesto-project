import {openImagePopup} from "./utils.js";


const cardsContainer = document.querySelector('.elements');

//функция создания элемента из template после загрузки данных пользователя
function createCard(cardObject, userId, handleDeleteIconClick, handleLikeIconClick) {
  const cardTemplate = document.querySelector('.element-template').content;
  const newCard = cardTemplate.querySelector('.element').cloneNode(true);
  const newCardImage = newCard.querySelector('.element__image');

  newCard.querySelector('.element__name').textContent = cardObject.name;
  newCardImage.alt = cardObject.name;
  newCardImage.src = cardObject.link;
  newCard.querySelector('.element__like-count').textContent = cardObject.likes.length;

  newCard.querySelector('.element__like').addEventListener('click', () => handleLikeIconClick(newCard, cardObject._id));
  newCard.querySelector('.element__delete').addEventListener('click', () => handleDeleteIconClick(newCard, cardObject._id));
  newCardImage.addEventListener('click', openImagePopup);

  newCard.dataset._id = cardObject._id;

  setDeleteButtonVisibility(cardObject, userId, newCard);
  setLikeButtonStyle(cardObject, userId, newCard);

  return newCard;
}

//установка кнопки удаления карточки, если она загружена моим пользователем
function setDeleteButtonVisibility(cardObject, userId, newCard) {
  if (cardObject.owner._id === userId) {
    newCard.querySelector('.element__delete').classList.add('element__delete_active');
  }
}

//установка стиля кнопки Like, если мой пользователь есть среди лайкнувших эту карточку
function setLikeButtonStyle(cardObject, userId, newCard) {
  if (cardObject.likes.some((userThatLiked) => userThatLiked._id === userId)) {
    renderLike(newCard);
    newCard.dataset.likedByMe = true;
  }
  else {
    newCard.dataset.likedByMe = false;
  }
}

//функция удаления карточки из DOM
const handleDeleteCard = (card) => {
  card.remove();
  card = null;
};

//функция добавления созданного элемента в разметку
function addCard(cardObject, userId, handleDeleteIconClick, handleLikeIconClick) {
  cardsContainer.prepend(createCard(cardObject, userId, handleDeleteIconClick, handleLikeIconClick));
}

//функция переключения стиля кнопки Like
function renderLike(cardElement) {
  cardElement.querySelector('.element__like').classList.toggle('element__like_active');
}

//функция обновления количества лайков
function renderLikeCount(cardElement, updatedCard) {
  cardElement.querySelector('.element__like-count').textContent = updatedCard.likes.length;
}



export {addCard, handleDeleteCard, renderLikeCount, renderLike};
