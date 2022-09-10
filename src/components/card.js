// Импорт функций по открытию и закртию попап
import { openPopup, closePopup } from "./modal";

const initialCards = [{
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
{
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},
{
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},
{
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}
];

// Константы
const cardTemplate = document.querySelector('#card-template').content;
const popupImage = document.querySelector('.popup__image');
const popupImageContent = popupImage.querySelector('.popup__image-content');
const popupImageTitle = popupImage.querySelector('.popup__image-title');

// Функция создания новой карточки  
function createCard(cardTitleName, cardImageLink) {
  const cardElement = cardTemplate.querySelector('.card__item').cloneNode(true); // Разметку карточки .card__item
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  cardTitle.textContent = cardTitleName;
  cardImage.src = cardImageLink;
  cardImage.alt = cardTitleName;

  // Реализация кнопки лайка
  cardLikeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_active');
  });

  // Реализация удаления карточки
  cardDeleteButton.addEventListener('click', function () {
    cardElement.remove();
  });

  // Попап открытия картинки
  cardImage.addEventListener('click', function () {
    openPopup(popupImage);
    popupImageContent.src = cardImageLink;
    popupImageContent.alt = cardTitleName;
    popupImageTitle.textContent = cardTitleName;
  });

  // Результат работы функции:
  return cardElement;
}

export {createCard, initialCards}; 
// Экспортируем функцию создания карточки и массив с данными