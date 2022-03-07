const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: 'popup__input-error_active'
};

const popups = document.querySelectorAll('.popup');
const profileEditPopup = document.querySelector('#profile-edit-popup');
const cardAddPopup = document.querySelector('#card-add-popup');
const imagePopup = document.querySelector('#image-popup');
const avatarEditPopup = document.querySelector('#avatar-edit-popup');

const profileEditForm = document.querySelector('#profile-edit-form');

const nameInput=document.querySelector('#profile-name-input');
const bioInput=document.querySelector('#profile-bio-input');

const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const profileAvatar = document.querySelector('.profile__image');

const avatarEditForm = document.querySelector('#avatar-edit-form');
const avatarLinkInput = document.querySelector('#avatar-link-input');

const cardAddForm = document.querySelector('#card-add-popup');

const cardPlaceInput = cardAddForm.querySelector('#card-place-input');
const cardUrlInput = cardAddForm.querySelector('#card-url-input');

const activeImage = imagePopup.querySelector('.popup__image');
const activeImageCaption = imagePopup.querySelector('.popup__caption');

export {config, profileEditPopup, cardAddPopup, imagePopup, avatarEditPopup, profileEditForm, nameInput, bioInput, cardAddForm, cardPlaceInput, cardUrlInput, popups, profileName, profileBio, profileAvatar, avatarEditForm, avatarLinkInput, activeImage, activeImageCaption};
