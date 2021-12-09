


//Добавление обработчиков на кнопки лайков
let likeButtons = document.querySelectorAll('.element__like');

function likeHandler(evt) {
  evt.target.closest('.element__like').classList.toggle('element__like_active');
}

function updateLikeButtons() {
  likeButtons = document.querySelectorAll('.element__like');
  for (let i = 0;i<likeButtons.length;i++) {
    likeButtons[i].addEventListener('click', likeHandler);
  }
}

updateLikeButtons();

//Добавление обработчиков на кнопки удаления

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
