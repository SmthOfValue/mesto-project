import {config, popups, cardPlaceInput, cardUrlInput, profileNameInput, profileBioInput} from "./utils.js";
import {resetFormValidity} from "./validate.js";


//функция открытия попапа в зависимости от нажатой кнопки с установкой слушателей событий для закрытия попапа
function popupHandler(evt) {
  if (evt.target.classList.contains('profile__edit')) {
    const nameInput=document.querySelector('#profile-name-input');
    const bioInput=document.querySelector('#profile-bio-input');
    const popup = document.querySelector('#profile-edit-popup');

    nameInput.value=document.querySelector('.profile__name').textContent;
    bioInput.value=document.querySelector('.profile__bio').textContent;

    resetFormValidity(popup, config);

    popupOpen(popup);
    setPopupClosureEventListeners();
  }
  if (evt.target.classList.contains('profile__add')) {
    const popup = document.querySelector('#card-add-popup');

    cardPlaceInput.value = '';
    cardUrlInput.value = '';

    resetFormValidity(popup, config);

    popupOpen(popup);
    setPopupClosureEventListeners();
  }
  if (evt.target.classList.contains('element__image')) {
    const popup = document.querySelector('#image-popup');

    popup.querySelector('.popup__image').src = evt.target.src;
    popup.querySelector('.popup__caption').textContent = evt.target.alt;

    popupOpen(popup);
    popup.style.background = "rgba(0, 0, 0, 0.9)";

    setPopupClosureEventListeners();
  }
}

function popupOpen(popup) {
  popup.classList.add('popup_opened');
  popup.style.opacity = 1;
}

//функции установки и удаления слушателей событий закрытия попапа
function setPopupClosureEventListeners() {
  window.addEventListener('keydown', popupCloseHandler);
  window.addEventListener('click', popupCloseHandler);
}

function removePopupClosureEventListeners() {
  window.removeEventListener('keydown', popupCloseHandler);
  window.removeEventListener('click', popupCloseHandler);
}

//функция закрытия попапа с удалением слушателей событий для закрытия попапа
function popupClose(){
  const openPopup = findOpenPopup();
  removePopupClosureEventListeners();
  openPopup.classList.remove('popup_opened');
  openPopup.style.opacity = 0.3;

}

//функция обработчик разных способов закрытия попапа
function popupCloseHandler (evt) {
  if (evt.key === "Escape") {
    popupClose();
  }

  if (evt.target.classList.contains('popup')) {
    popupClose();
  }

  if (evt.target.classList.contains('popup__close')) {
    popupClose();
  }
}

//функция нахождения открытого попапа
function findOpenPopup() {
  let openPopup;
  popups.forEach(popup => {
    if (popup.classList.contains('popup_opened')) {
      openPopup = popup;
    }
  });

  return openPopup;
}

//обработчик отправки формы редактирования профиля
function profileSubmitHandler(evt) {
  evt.preventDefault();
  document.querySelector('.profile__name').textContent = profileNameInput.value;
  document.querySelector('.profile__bio').textContent = profileBioInput.value;
  popupClose(evt);
}

export {profileSubmitHandler, popupHandler, popupClose};
