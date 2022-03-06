import {enableValidation} from "./components/validate.js";
import {config, profileEditForm, cardAddForm, popups, profileName, profileBio, profileAvatar, avatarEditForm} from "./components/utils.js";
import {cardSubmitHandler, addCard} from "./components/card.js";
import {profileSubmitHandler, openProfileEditPopup, openCardAddPopup, openAvatarEditPopup, submitNewAvatar} from "./components/modal.js";
import {getInitialCards} from "./components/api.js";
import {userInfo} from "./components/utils.js";

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

//загрузка данных о пользователе с сервера
userInfo
  .then((userInfo) => {
    profileName.textContent = userInfo.name;
    profileBio.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;
    profileAvatar.alt = userInfo.name;
  })
  .catch((err) => {
    console.log(err);
  });

//добавление обработчика изменения профиля и добавления новой карточки
profileEditForm.addEventListener('submit', profileSubmitHandler);

cardAddForm.addEventListener('submit', cardSubmitHandler);

avatarEditForm.addEventListener('submit', submitNewAvatar);

//добавление изначального набора элементов на страницу
getInitialCards()
  .then((data) => {
    data.forEach(function (item) {
      addCard(item);
    });
  })
  .catch((err) => {
    console.log(err);
  });




//добавление обработчиков на кнопки открытия форм
const cardAddButton=document.querySelector('.profile__add');
cardAddButton.addEventListener('click', openCardAddPopup);

const profileEditButton=document.querySelector('.profile__edit');
profileEditButton.addEventListener('click', openProfileEditPopup);

const avatarEditButton = document.querySelector('.profile__avatar');
avatarEditButton.addEventListener('click', openAvatarEditPopup);

enableValidation(config);

