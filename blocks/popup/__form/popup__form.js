const formElement = document.querySelector('#profile-edit-form');

const nameInput = document.querySelector('#profile-name-input');
const bioInput = document.querySelector('#profile-bio-input');

function formSubmitHandler(evt) {
  evt.preventDefault();
  document.querySelector('.profile__name').textContent = nameInput.value;
  document.querySelector('.profile__bio').textContent = bioInput.value;
  popupClose();
}

formElement.addEventListener('submit', formSubmitHandler);
