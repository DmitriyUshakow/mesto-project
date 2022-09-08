// Здесь общие функции открытия и закрытия модальных окон с их колбеками

//Функция закрытия окна Popup клавишей ESC
function handleHotkey(evt) {
  //Новая переменная открытого окна popup
  const activePopup = document.querySelector('.popup_opened');
  if (evt.key == 'Escape') {
    closePopup(activePopup);
  }
}

//Функция закрытия окна Popup кликом на Overlay
function handleOverlayClick(evt) {
  //Новая переменная открытого окна popup
  const activePopup = document.querySelector('.popup_opened');
  if (evt.target === activePopup) {
    closePopup(activePopup);
  }
}

// Общая функция c механизмом открытия окна popup
function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  // Слушатели нажатия Esc и клика по Overlay
  document.addEventListener('keydown', handleHotkey);
  document.addEventListener('click', handleOverlayClick);
}

// Общая функция c механизмом закрытия окна popup
function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  // Убираем слушатели нажатия Esc и клика по Overlay
  document.removeEventListener('keydown', handleHotkey);
  document.removeEventListener('click', handleOverlayClick);
}

export {openPopup, closePopup};