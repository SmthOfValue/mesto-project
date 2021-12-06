// Дается display: flex с задержкой при загрузке, чтобы не возникало мелькание popup при загрузке/обновлении страницы
window.addEventListener('load', function(){
  setTimeout(function(){document.querySelector('.popup').style.display = 'flex'}, 1000);
});
