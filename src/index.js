import {resetFormValidity, enableValidation} from "./components/validate.js";
import {config, profileEditForm, cardAddForm, popups, profileName, profileBio, nameInput, bioInput, profileAvatar, avatarEditForm, avatarEditPopup, avatarLinkInput, cardPlaceInput, cardUrlInput, activeImage, activeImageCaption, imagePopup, profileEditPopup, cardAddPopup} from "./components/utils.js";
import {addCard, handleDeleteCard, renderLikeCount, renderLike} from "./components/card.js";
import {openPopup, closePopup} from "./components/modal.js";
import {getInitialCards, getUserInfo, uploadCard, deleteCardOnServer, setLikeOnServer, updateProfile, uploadNewAvatar} from "./components/api.js";


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

//получение и отображения данных о пользователе и карточках с сервера
Promise.all([getUserInfo(), getInitialCards()])
  .then((serverData) => {
    const userInfo = serverData[0];
    profileName.textContent = userInfo.name;
    profileBio.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;
    profileAvatar.alt = userInfo.name;

    const initialCards = serverData[1];
    renderCards(initialCards, userInfo._id, handleDeleteIconClick, handleLikeIconClick);
  })
  .catch((err) => {
    console.log(err);
  });

//функция отображения загрузки при отправке формы
function renderLoading(popup, isSaving, originalText) {
  const saveButton = popup.querySelector('.popup__save');
  if (isSaving) {
    const buttonOriginalText = saveButton.textContent;
    saveButton.textContent = 'Сохранение...';
    return buttonOriginalText;
  }
  else {
    saveButton.textContent = originalText;
  }
}

//функция открытия попапа в зависимости от нажатой кнопки с установкой слушателей событий для закрытия попапа
function openProfileEditPopup() {
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
  resetFormValidity(profileEditPopup, config);
  openPopup(profileEditPopup);
}

function openCardAddPopup() {
  cardPlaceInput.value = '';
  cardUrlInput.value = '';
  resetFormValidity(cardAddPopup, config);
  openPopup(cardAddPopup);
}

function openImagePopup(evt) {
  activeImage.src = evt.target.src;
  activeImage.alt = evt.target.alt;
  activeImageCaption.textContent = evt.target.alt;
  openPopup(imagePopup);
  imagePopup.style.background = "rgba(0, 0, 0, 0.9)";
}

//функция отображения карточек из массива
function renderCards(cardArray, userId, handleDeleteIconClick, handleLikeIconClick) {
  cardArray.reverse().forEach(function (item) {
    addCard(item, userId, handleDeleteIconClick, handleLikeIconClick);
  });
}


//обработчик отправки формы добавления элемента
function handeCardSubmit(evt) {
  evt.preventDefault();
  const cardObject = {
    "name": cardPlaceInput.value,
    "link": cardUrlInput.value
  }
  const originalButtonText = renderLoading(cardAddPopup, true);
  uploadCard(cardObject)
    .then((newCard) => {
      addCard(newCard, newCard.owner._id, handleDeleteIconClick, handleLikeIconClick);
      cardPlaceInput.value = '';
      cardUrlInput.value = '';
      closePopup(evt);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(cardAddPopup, false, originalButtonText);
    });
}

//обработчик кнопки удаления карточки
function handleDeleteIconClick (cardElement, cardId) {
  deleteCardOnServer(cardId)
    .then(() => {
      handleDeleteCard(cardElement);
    })
    .catch((err) => {
      console.log(err);
    });
}

//обработчик кнопки like
function handleLikeIconClick(cardElement, cardId) {
  const action = selectLikeAction(cardElement);
  setLikeOnServer(cardId, action)
    .then((updatedCard) => {
      renderLikeCount(cardElement, updatedCard);
      cardElement.dataset.likedByMe = !JSON.parse(cardElement.dataset.likedByMe);
      renderLike(cardElement);
    })
    .catch((err) => {
      console.log(err);
    });
  }


function selectLikeAction(cardElement) {

  if (JSON.parse(cardElement.dataset.likedByMe)) {
    return 'DELETE';
  }
  else {
    return 'PUT';
  }
}

//обработчик отправки формы редактирования профиля
function handleProfileSubmit(evt) {
  evt.preventDefault();
  const profileObject = {
    "name": nameInput.value,
    "about": bioInput.value
  }
  const originalButtonText = renderLoading(profileEditPopup, true);
  updateProfile(profileObject)
    .then((updatedProfile) => {
      profileName.textContent = updatedProfile.name;
      profileBio.textContent = updatedProfile.about;
      closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(profileEditPopup, false, originalButtonText);
    });
}

//функция открытия попапа редактирования аватара
function openAvatarEditPopup() {
  avatarLinkInput.value = '';
  resetFormValidity(avatarEditPopup, config);
  openPopup(avatarEditPopup);
}

//обработчик отправки формы редактирования аватара
function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const avatarLink = avatarLinkInput.value;
  const originalButtonText = renderLoading(avatarEditPopup, true);
  uploadNewAvatar(avatarLink)
    .then((updatedUser) => {
      profileAvatar.src = updatedUser.avatar;
      closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(avatarEditPopup, false, originalButtonText);
    });
}


//добавление обработчика изменения профиля и добавления новой карточки
profileEditForm.addEventListener('submit', handleProfileSubmit);

cardAddForm.addEventListener('submit', handeCardSubmit);

avatarEditForm.addEventListener('submit', handleAvatarSubmit);

//добавление обработчиков на кнопки открытия форм
const cardAddButton=document.querySelector('.profile__add');
cardAddButton.addEventListener('click', openCardAddPopup);

const profileEditButton=document.querySelector('.profile__edit');
profileEditButton.addEventListener('click', openProfileEditPopup);

const avatarEditButton = document.querySelector('.profile__avatar');
avatarEditButton.addEventListener('click', openAvatarEditPopup);

enableValidation(config);

export {openImagePopup};
