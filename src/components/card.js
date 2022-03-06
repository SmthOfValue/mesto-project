import {cardPlaceInput, cardUrlInput} from "./utils.js";
import {closePopup, openImagePopup} from "./modal.js";
import {uploadCard, deleteCardOnServer, setLikeOnServer} from "./api.js";
import {userInfo} from "./user.js";

const cardsContainer = document.querySelector('.elements');

//функция создания элемента из template
function createCard(cardObject) {
  const cardTemplate = document.querySelector('.element-template').content;
  const newCard = cardTemplate.querySelector('.element').cloneNode(true);

  userInfo
    .then((user) => {
      newCard.querySelector('.element__name').textContent = cardObject.name;
      newCard.querySelector('.element__image').alt = cardObject.name;
      newCard.querySelector('.element__image').src = cardObject.link;
      newCard.querySelector('.element__like-count').textContent = cardObject.likes.length;

      newCard.querySelector('.element__like').addEventListener('click', likeCard);
      newCard.querySelector('.element__delete').addEventListener('click', deleteCard);
      newCard.querySelector('.element__image').addEventListener('click', openImagePopup);

      newCard.dataset._id = cardObject._id;
      //удаление кнопки удаления карточки, если она загружена не моим пользователем
      if (cardObject.owner._id === user._id) {
        newCard.querySelector('.element__delete').classList.add('element__delete_active');
      }
      //установка стиля кнопки Like, если мой пользователь есть среди лайкнувших эту карточку
      if (cardObject.likes.some((userThatLiked) => userThatLiked._id === user._id)) {
        renderLike(newCard);
        newCard.dataset.likedByMe = true;
      }
      else {
        newCard.dataset.likedByMe = false;
      }
  });

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
    })
    .finally(() => {
      cardPlaceInput.value = '';
      cardUrlInput.value = '';
      closePopup(evt);
    });

}

//обработчик кнопки удаления элементов
function deleteCard(evt) {
  const cardId = evt.target.closest('.element').dataset._id;
  deleteCardOnServer(cardId)
    .then(() => {
      evt.target.closest('.element').remove();
    });
}
//функция переключения стиля кнопки Like
function renderLike(cardElement) {
  cardElement.querySelector('.element__like').classList.toggle('element__like_active');
}

function selectLikeAction(cardElement) {

  if (JSON.parse(cardElement.dataset.likedByMe)) {
    return 'DELETE';
  }
  else {
    return 'PUT';
  }
}

//обработчик кнопки like
function likeCard(evt) {
  const cardElement = evt.target.closest('.element');
  const cardId = cardElement.dataset._id;
  const action = selectLikeAction(cardElement);
  setLikeOnServer(cardId, action)
    .then((updatedCard) => {
      cardElement.querySelector('.element__like-count').textContent = updatedCard.likes.length;
      cardElement.dataset.likedByMe = !JSON.parse(cardElement.dataset.likedByMe);
      renderLike(cardElement);
    });
  }

export {cardSubmitHandler, addCard};
