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
  popupClose(evt);
}

cardAddForm.addEventListener('submit', cardSubmitHandler);
