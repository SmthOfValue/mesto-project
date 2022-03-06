import {getUserInfo} from "./api.js";

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: 'popup__input-error_active'
};

const profileEditForm = document.querySelector('#profile-edit-form');

const profileNameInput = profileEditForm.querySelector('#profile-name-input');
const profileBioInput = profileEditForm.querySelector('#profile-bio-input');

const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const profileAvatar = document.querySelector('.profile__image');

const avatarEditForm = document.querySelector('#avatar-edit-form');

const cardAddForm = document.querySelector('#card-add-popup');

const cardPlaceInput = cardAddForm.querySelector('#card-place-input');
const cardUrlInput = cardAddForm.querySelector('#card-url-input');

const popups = document.querySelectorAll('.popup');

const userInfo = getUserInfo();

export {config, profileEditForm, profileNameInput, profileBioInput, cardAddForm, cardPlaceInput, cardUrlInput, popups, profileName, profileBio, profileAvatar, avatarEditForm, userInfo};
