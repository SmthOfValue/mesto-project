import {config, popups, cardPlaceInput, cardUrlInput, profileNameInput, profileBioInput, profileName, profileBio, profileAvatar} from "./utils.js";
import {resetFormValidity} from "./validate.js";
import {updateProfile, uploadNewAvatar} from "./api.js";

const nameInput=document.querySelector('#profile-name-input');
const bioInput=document.querySelector('#profile-bio-input');
const profileEditPopup = document.querySelector('#profile-edit-popup');
const cardAddPopup = document.querySelector('#card-add-popup');
const imagePopup = document.querySelector('#image-popup');
const avatarEditPopup = document.querySelector('#avatar-edit-popup');
const avatarLinkInput = document.querySelector('#avatar-link-input');
const activeImage = imagePopup.querySelector('.popup__image');
const activeImageCaption = imagePopup.querySelector('.popup__caption');


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

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.style.opacity = 1;
  setPopupClosureEventListeners(popup);
}

//функции установки и удаления слушателей событий закрытия попапа
function setPopupClosureEventListeners(popup) {
  window.addEventListener('keydown', closePopupOnEsc);
  popup.addEventListener('click', closePopupOnClick);
}

function removePopupClosureEventListeners(popup) {
  window.removeEventListener('keydown', closePopupOnEsc);
  popup.removeEventListener('click', closePopupOnClick);
}

//функция закрытия попапа с удалением слушателей событий для закрытия попапа
function closePopup(){
  const activePopup = findActivePopup();
  removePopupClosureEventListeners(activePopup);
  activePopup.classList.remove('popup_opened');
  activePopup.style.opacity = 0.3;

}

//функции обработчики разных способов закрытия попапа
function closePopupOnEsc (evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
}

function closePopupOnClick (evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup();
  }

  if (evt.target.classList.contains('popup__close')) {
    closePopup();
  }
}

//функция нахождения открытого попапа
function findActivePopup() {
  let activePopup;
  popups.forEach(popup => {
    if (popup.classList.contains('popup_opened')) {
      activePopup = popup;
    }
  });

  return activePopup;
}

//обработчик отправки формы редактирования профиля
function profileSubmitHandler(evt) {
  evt.preventDefault();
  const profileObject = {
    "name": profileNameInput.value,
    "about": profileBioInput.value
  }
  const originalButtonText = renderLoading(profileEditPopup, true);
  updateProfile(profileObject)
    .then((updatedProfile) => {
      profileName.textContent = updatedProfile.name;
      profileBio.textContent = updatedProfile.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closePopup();
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
function submitNewAvatar(evt) {
  evt.preventDefault();
  const avatarLink = avatarLinkInput.value;
  const originalButtonText = renderLoading(avatarEditPopup, true);
  uploadNewAvatar(avatarLink)
    .then((updatedUser) => {
      profileAvatar.src = updatedUser.avatar;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closePopup();
      renderLoading(avatarEditPopup, false, originalButtonText);
    });

}
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

export {profileSubmitHandler, openProfileEditPopup, openCardAddPopup, openImagePopup, closePopup, openAvatarEditPopup, submitNewAvatar, cardAddPopup, renderLoading};
