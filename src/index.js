import {enableValidation} from "./components/validate.js";
import {config, profileEditForm, cardAddForm, popups, profileName, profileBio, profileAvatar} from "./components/utils.js";
import {cardSubmitHandler, addCard} from "./components/card.js";
import {profileSubmitHandler, openProfileEditPopup, openCardAddPopup} from "./components/modal.js";
import {getInitialCards, getUserInfo} from "./components/api.js";

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

//добавление данных о пользователе
getUserInfo()
.then((userInfo) => {
  console.log(userInfo);
  profileName.textContent = userInfo.name;
  profileBio.textContent = userInfo.about;
  profileAvatar.src = userInfo.avatar;
  profileAvatar.alt = userInfo.name;
});

//добавление обработчика изменения профиля и добавления новой карточки
profileEditForm.addEventListener('submit', profileSubmitHandler);

cardAddForm.addEventListener('submit', cardSubmitHandler);


//добавление изначального набора элементов на страницу
getInitialCards()
  .then((data) => {
    console.log(data);
    data.forEach(function (item) {
      addCard(item);
    });
  });




//добавление обработчиков на кнопки открытия форм
const addButton=document.querySelector('.profile__add');
addButton.addEventListener('click', openCardAddPopup);

const editButton=document.querySelector('.profile__edit');
editButton.addEventListener('click', openProfileEditPopup);

enableValidation(config);


