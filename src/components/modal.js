import {popups} from "./utils.js";

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.style.opacity = 1;
  setPopupClosureEventListeners(popup);
}

//функции установки и удаления слушателей событий закрытия попапа
function setPopupClosureEventListeners(popup) {
  window.addEventListener('keydown', closePopupOnEsc);
  popup.addEventListener('mousedown', closePopupOnClick);
}

function removePopupClosureEventListeners(popup) {
  window.removeEventListener('keydown', closePopupOnEsc);
  popup.removeEventListener('mousedown', closePopupOnClick);
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



export {openPopup, closePopup};
