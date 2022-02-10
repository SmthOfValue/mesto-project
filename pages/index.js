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
    popupOpen(evt);
  }
});

//обработчик кнопок закрытия форм и добавление обработчика на все кнопки закрытия форм
const popups = document.querySelectorAll('.popup');

function findOpenPopup() {
  let openPopup;
  popups.forEach(popup => {
    if (popup.classList.contains('popup_opened')) {
      openPopup = popup;
    }
  });
  return openPopup;
}


function popupClose(){
  const popup = findOpenPopup();
  popup.classList.remove('popup_opened');
  popup.style.opacity = 0.3;

}

/*for (let i = 0; i<popups.length; i++){
  let closeButton = popups[i].querySelector('.popup__close');
  closeButton.addEventListener('click', popupClose);
}*/

window.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup')) {
    popupClose();
  }

  if (evt.target.classList.contains('popup__close')) {
    popupClose();
  }
});

window.addEventListener('keydown', function (evt) {
  if (evt.key === "Escape") {
    popupClose();
  }
});


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





//функция открытия попапа в зависимости от нажатой кнопки
function popupOpen(evt) {
  if (evt.target.classList.contains('profile__edit')) {
    const nameInput=document.querySelector('#profile-name-input');
    const bioInput=document.querySelector('#profile-bio-input');
    const popup = document.querySelector('#profile-edit-popup');

    nameInput.value=document.querySelector('.profile__name').textContent;
    bioInput.value=document.querySelector('.profile__bio').textContent;

    popup.classList.add('popup_opened');
    popup.style.opacity = 1;
  }
  if (evt.target.classList.contains('profile__add')) {
    const popup = document.querySelector('#card-add-popup');
    popup.classList.add('popup_opened');
    popup.style.opacity = 1;
  }
  if (evt.target.classList.contains('element__image')) {
    const popup = document.querySelector('#image-popup');
    popup.querySelector('.popup__image').src = evt.target.src;
    popup.querySelector('.popup__caption').textContent = evt.target.alt;
    popup.classList.add('popup_opened');
    popup.style.opacity = 1;
    popup.style.background = "rgba(0, 0, 0, 0.9)";


  }

}

//добавление обработчиков на кнопки открытия форм
const addButton=document.querySelector('.profile__add');
addButton.addEventListener('click', popupOpen);

const editButton=document.querySelector('.profile__edit');
editButton.addEventListener('click', popupOpen);



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
