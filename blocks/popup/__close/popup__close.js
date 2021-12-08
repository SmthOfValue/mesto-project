const popups = document.querySelectorAll('.popup');


function popupClose(evt){
  const popup = evt.target.closest('.popup');
  popup.classList.remove('popup_opened');
  popup.style.opacity = 0.3;

}

for (let i = 0; i<popups.length; i++){
  let closeButton = popups[i].querySelector('.popup__close');
  closeButton.addEventListener('click', popupClose);
}

