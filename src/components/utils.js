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

const cardAddForm = document.querySelector('#card-add-popup');

const cardPlaceInput = cardAddForm.querySelector('#card-place-input');
const cardUrlInput = cardAddForm.querySelector('#card-url-input');

const popups = document.querySelectorAll('.popup');

export {config, profileEditForm, profileNameInput, profileBioInput, cardAddForm, cardPlaceInput, cardUrlInput, popups};
