const editButton=document.querySelector('.profile__edit');

function popupOpen() {
  const nameInput=document.querySelector('#profile-name-input');
  const bioInput=document.querySelector('#profile-bio-input');
  const popup = document.querySelector('.popup');

  nameInput.value=document.querySelector('.profile__name').textContent;
  bioInput.value=document.querySelector('.profile__bio').textContent;

  popup.classList.add('popup_opened');
  popup.style.opacity = 1;
  
}

editButton.addEventListener('click', popupOpen);
