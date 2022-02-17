// Дается display: flex с задержкой при загрузке, чтобы не возникало мелькание popup при загрузке/обновлении страницы
function addFlex(){
  setTimeout(function(){
    const popups = document.querySelectorAll('.popup');
    for (let i = 0;i<popups.length;i++) {
      popups[i].style.display = 'flex';
    }
  }, 1000);
}
window.addEventListener('load', addFlex);

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: 'popup__input-error_active'
};


//добавление обработчиков на открытие попапа с картинкой
/*let elementImages = document.querySelectorAll('.element__image');

function updateElementViews(){
  elementImages = document.querySelectorAll('.element__image');
  for (let i = 0;i<elementImages.length;i++) {
    elementImages[i].addEventListener('click', popupOpen);
  }
}*/

//updateElementViews();

const elementsContainer = document.querySelector('.elements');

elementsContainer.addEventListener ('click', function (evt) {
  if (evt.target.classList.contains('element__image')) {
    popupHandler(evt);
  }
});


const popups = document.querySelectorAll('.popup');

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

//сброс сообщений об ошибках валидации
function resetFormValidity(openPopup) {
  const formElement = openPopup.querySelector('.popup__form');
  const inputList = Array.from(formElement.querySelectorAll('.popup__input-text'));
  const buttonElement = formElement.querySelector('.popup__save');
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
  toggleButtonState(inputList, buttonElement);
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

//функции установки и удаления слушателей событий закрытия попапа
function setPopupClosureEventListeners() {
  window.addEventListener('keydown', popupCloseHandler);
  window.addEventListener('click', popupCloseHandler);
}

function removePopupClosureEventListeners() {
  window.removeEventListener('keydown', popupCloseHandler);
  window.removeEventListener('click', popupCloseHandler);
}


//обработчик кнопки like
let likeButtons = document.querySelectorAll('.element__like');

function likeHandler(evt) {
  evt.target.closest('.element__like').classList.toggle('element__like_active');
}
//добавление обработчиков на все кнопки like
function updateLikeButtons() {
  likeButtons = document.querySelectorAll('.element__like');
  for (let i = 0;i<likeButtons.length;i++) {
    likeButtons[i].addEventListener('click', likeHandler);
  }
}

updateLikeButtons();

//Добавление обработчиков на кнопки удаления элементов

let deleteButtons = document.querySelector('.element__delete');

function deleteHandler(evt) {
  evt.target.closest('.element').remove();
}

function updateDeleteButtons() {
  deleteButtons = document.querySelectorAll('.element__delete');
  for (let i = 0;i<deleteButtons.length;i++) {
    deleteButtons[i].addEventListener('click', deleteHandler);
  }
}

updateDeleteButtons();


//обработчик отправки формы редактирования профиля
const profileEditForm = document.querySelector('#profile-edit-form');

const profileNameInput = profileEditForm.querySelector('#profile-name-input');
const profileBioInput = profileEditForm.querySelector('#profile-bio-input');

function profileSubmitHandler(evt) {
  evt.preventDefault();
  document.querySelector('.profile__name').textContent = profileNameInput.value;
  document.querySelector('.profile__bio').textContent = profileBioInput.value;
  popupClose(evt);
}

profileEditForm.addEventListener('submit', profileSubmitHandler);

//обработчик отправки формы добавления элемента
const cardAddForm = document.querySelector('#card-add-popup');

const cardPlaceInput = cardAddForm.querySelector('#card-place-input');
const cardUrlInput = cardAddForm.querySelector('#card-url-input');

function cardSubmitHandler(evt) {
  evt.preventDefault();
  const cardObject = {
    'cardName': cardPlaceInput.value,
    'cardSource': cardUrlInput.value
}
  addCard(cardObject);
  cardPlaceInput.value = '';
  cardUrlInput.value = '';
  popupClose(evt);
}

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


function popupOpen(popup) {
  popup.classList.add('popup_opened');
  popup.style.opacity = 1;
}


//функция открытия попапа в зависимости от нажатой кнопки с установкой слушателей событий для закрытия попапа
function popupHandler(evt) {
  if (evt.target.classList.contains('profile__edit')) {
    const nameInput=document.querySelector('#profile-name-input');
    const bioInput=document.querySelector('#profile-bio-input');
    const popup = document.querySelector('#profile-edit-popup');

    nameInput.value=document.querySelector('.profile__name').textContent;
    bioInput.value=document.querySelector('.profile__bio').textContent;

    resetFormValidity(popup);

    popupOpen(popup);
    setPopupClosureEventListeners();
  }
  if (evt.target.classList.contains('profile__add')) {
    const popup = document.querySelector('#card-add-popup');

    cardPlaceInput.value = '';
    cardUrlInput.value = '';

    resetFormValidity(popup);

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

//добавление обработчиков на кнопки открытия форм
const addButton=document.querySelector('.profile__add');
addButton.addEventListener('click', popupHandler);

const editButton=document.querySelector('.profile__edit');
editButton.addEventListener('click', popupHandler);



//функция создания элемента из template
function createCard(cardObject) {
  const cardTemplate = document.querySelector('.element-template').content;
  const newCard = cardTemplate.querySelector('.element').cloneNode(true);

  newCard.querySelector('.element__name').textContent = cardObject.cardName;
  newCard.querySelector('.element__image').alt = cardObject.cardName;
  newCard.querySelector('.element__image').src = cardObject.cardSource;

  return newCard;
}

  //функция добавления созданного элемента в разметку
function addCard(cardObject) {
  const cardsContainer = document.querySelector('.elements');
  cardsContainer.prepend(createCard(cardObject));
  updateLikeButtons();
  updateDeleteButtons();
}






//включение и отключение отображения ошибки ввода
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = '';
};

//проверка валидности конкретного поля
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//добавление слушателей событий инпута на форму
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//установка слушателей событий для валидации форм
const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation(config);

//проверка валидности массива инпутов
function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

//переключение состояния кнопки в зависимости от валидности массива инпутов
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(obj.inactiveButtonClass);
    buttonElement.disabled = true;
  }
  else {
    buttonElement.classList.remove(obj.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

