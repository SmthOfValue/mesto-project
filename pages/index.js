const profileEditForm = document.querySelector('#profile-edit-form');
const profileNameInput = profileEditForm.querySelector('#profile-name-input');
const profileBioInput = profileEditForm.querySelector('#profile-bio-input');
const profileEditPopup = document.querySelector('#profile-edit-popup');
const cardAddPopup = document.querySelector('#card-add-popup');
const cardPlaceInput = cardAddPopup.querySelector('#card-place-input');
const cardUrlInput = cardAddPopup.querySelector('#card-url-input');
const imagePopup = document.querySelector('#image-popup');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const cardAddButton = document.querySelector('.profile__add');
const profileEditButton = document.querySelector('.profile__edit');
const cardTemplate = document.querySelector('.element-template').content;
const cardsContainer = document.querySelector('.elements');
const popups = document.querySelectorAll('.popup');


// Дается display: flex с задержкой при загрузке, чтобы не возникало мелькание popup при загрузке/обновлении страницы
function addFlex(){
  setTimeout(function(){
    for (let i = 0;i<popups.length;i++) {
      popups[i].style.display = 'flex';
    }
  }, 1000);
}
window.addEventListener('load', addFlex);

//функция добавления непрозрачности для открываемого popup
function setOpenedPopupOpacity(popup){
  popup.style.opacity = 1;
}
//функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
//функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
//функция возврата прозрачности закрытому попапу
function setClosedPopupOpacity(popup){
  popup.style.opacity = 0.3;
}

//обработчик нажатия на картинку
function openImagePopup(evt){
  imagePopup.querySelector('.popup__image').src = evt.target.src;
  imagePopup.querySelector('.popup__image').alt = evt.target.alt;
  imagePopup.querySelector('.popup__caption').textContent = evt.target.alt;
  openPopup(imagePopup);
  setOpenedPopupOpacity(imagePopup);
  imagePopup.style.background = "rgba(0, 0, 0, 0.9)";
}

//обработчик нажатия на кнопку добавления новой картинки
function openCardAddPopup(){
  openPopup(cardAddPopup);
  setOpenedPopupOpacity(cardAddPopup);
}

cardAddButton.addEventListener('click', openCardAddPopup);

//обработчик нажатия на кнопку редактирования профиля
function openProfileEditPopup() {
  profileNameInput.value=profileName.textContent;
  profileBioInput.value=profileBio.textContent;
  openPopup(profileEditPopup);
  setOpenedPopupOpacity(profileEditPopup);
}

profileEditButton.addEventListener('click', openProfileEditPopup);

//обработчик кнопок закрытия и добавление обработчика на все кнопки закрытия
function handleClosePopupButton(evt){
  const popup = evt.target.closest('.popup');
  closePopup(popup);
  setClosedPopupOpacity(popup);
}

for (let i = 0; i<popups.length; i++){
  let closeButton = popups[i].querySelector('.popup__close');
  closeButton.addEventListener('click', handleClosePopupButton);
}


//обработчик кнопки like
function likeCard(evt) {
  evt.target.closest('.element__like').classList.toggle('element__like_active');
}

//обработчик удаления картинки
function deleteCard(evt) {
  evt.target.closest('.element').remove();
}


//функция создания элемента из template
function createCard(cardObject) {
  const newCard = cardTemplate.querySelector('.element').cloneNode(true);

  newCard.querySelector('.element__name').textContent = cardObject.cardName;
  newCard.querySelector('.element__image').alt = cardObject.cardName;
  newCard.querySelector('.element__image').src = cardObject.cardSource;

  newCard.querySelector('.element__image').addEventListener('click', openImagePopup);
  newCard.querySelector('.element__delete').addEventListener('click', deleteCard);
  newCard.querySelector('.element__like').addEventListener('click', likeCard);

  return newCard;
}

//функция добавления созданного элемента в разметку
function addCard(cardObject) {
  cardsContainer.prepend(createCard(cardObject));
}


//обработчик отправки формы редактирования профиля
function submitProfileEditForm(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileBio.textContent = profileBioInput.value;
  closePopup(profileEditPopup);
  setClosedPopupOpacity(profileEditPopup);
}

profileEditForm.addEventListener('submit', submitProfileEditForm);

//обработчик отправки формы добавления элемента
function submitCardAddForm(evt) {
  evt.preventDefault();
  const cardObject = {
    'cardName': cardPlaceInput.value,
    'cardSource': cardUrlInput.value
  }
  addCard(cardObject);
  cardPlaceInput.value = '';
  cardUrlInput.value = '';
  closePopup(cardAddPopup);
  setClosedPopupOpacity(cardAddPopup);
}

cardAddPopup.addEventListener('submit', submitCardAddForm);


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
