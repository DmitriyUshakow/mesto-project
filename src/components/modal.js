// Здесь общие функции открытия и закрытия модальных окон с их колбеками
//Функция закрытия окна Popup клавишей ESC
import { disableButton } from "./utils";

function handleHotkey(evt) {
  if (evt.key == 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

//Функция закрытия окна Popup кликом на Overlay
function handleOverlayClick(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

// Общая функция c механизмом открытия окна popup
function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  // Слушатели нажатия Esc и клика по Overlay
  document.addEventListener('keydown', handleHotkey);
  popupName.addEventListener('click', handleOverlayClick);
}

// Общая функция c механизмом закрытия окна popup
function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  // Убираем слушатели нажатия Esc и клика по Overlay
  document.removeEventListener('keydown', handleHotkey);
  popupName.removeEventListener('click', handleOverlayClick);
}

export {openPopup, closePopup};