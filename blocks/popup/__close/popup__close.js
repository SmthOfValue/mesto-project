let closeButton=document.querySelector('.popup__close');

function popupClose(){
  const popup = document.querySelector('.popup');
  popup.classList.remove('popup_opened');
  popup.style.opacity = 0.3;

}

closeButton.addEventListener('click', popupClose);



