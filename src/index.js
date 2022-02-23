import {enableValidation} from "./components/validate.js";
import {config, profileEditForm, cardAddForm, popups} from "./components/utils.js";
import {cardSubmitHandler, addCard} from "./components/card.js";
import {profileSubmitHandler, openProfileEditPopup, openCardAddPopup} from "./components/modal.js";

import './pages/index.css';
// Дается display: flex с задержкой при загрузке, чтобы не возникало мелькание popup при загрузке/обновлении страницы
function addFlex(){
  setTimeout(function(){
    for (let i = 0;i<popups.length;i++) {
      popups[i].style.display = 'flex';
    }
  }, 1000);
}
window.addEventListener('load', addFlex);

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
addButton.addEventListener('click', openCardAddPopup);

const editButton=document.querySelector('.profile__edit');
editButton.addEventListener('click', openProfileEditPopup);

enableValidation(config);


