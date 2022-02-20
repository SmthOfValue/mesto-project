import {enableValidation} from "./components/validate.js";
import {config, profileEditForm, cardAddForm, popups} from "./components/utils.js";
import {likeHandler, deleteHandler, cardSubmitHandler, addCard} from "./components/card.js";
import {profileSubmitHandler, popupHandler} from "./components/modal.js";

// Дается display: flex с задержкой при загрузке, чтобы не возникало мелькание popup при загрузке/обновлении страницы
function addFlex(){
  setTimeout(function(){
    for (let i = 0;i<popups.length;i++) {
      popups[i].style.display = 'flex';
    }
  }, 1000);
}
window.addEventListener('load', addFlex);

//добавление обработчиков на открытие попапа с картинкой
const elementsContainer = document.querySelector('.elements');

elementsContainer.addEventListener ('click', function (evt) {
  if (evt.target.classList.contains('element__image')) {
    popupHandler(evt);
  }
});
//добавление обработчика кнопок Like, Delete
elementsContainer.addEventListener('click', likeHandler);

elementsContainer.addEventListener('click', deleteHandler);

//добавление обработчика изменения профиля и добавления новой карточки
profileEditForm.addEventListener('submit', profileSubmitHandler);

cardAddForm.addEventListener('submit', cardSubmitHandler);


//добавление изначального набора элементов на страницу
const initialCards = [
  {
    cardName: 'Архыз',
    cardSource: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    cardName: 'Челябинская область',
    cardSource: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    cardName: 'Иваново',
    cardSource: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    cardName: 'Камчатка',
    cardSource: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    cardName: 'Холмогорский район',
    cardSource: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    cardName: 'Байкал',
    cardSource: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(function (item) {
  addCard(item);
});

//добавление обработчиков на кнопки открытия форм
const addButton=document.querySelector('.profile__add');
addButton.addEventListener('click', popupHandler);

const editButton=document.querySelector('.profile__edit');
editButton.addEventListener('click', popupHandler);

enableValidation(config);


