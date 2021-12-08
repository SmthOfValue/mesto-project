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
