// Импортируем файл стилей
import '../styles/index.css';

import {openPopup, closePopup} from './modal';
import {handleProfileFormSubmit} from './utils';
import {createCard, initialCards} from './card';
import {enableValidation, validationSettings} from './validate';

const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.card');
const profileEditButton = content.querySelector('.profile__edit-button');
const ProfileEditForm = document.querySelector('.popup-edit-profile');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const profileInputName = document.querySelector('.form__input-name');
const profileInputDescription = document.querySelector('.form__input-job');
const popupCard = document.querySelector('.popup-add-new-card');
const newCardForm = popupCard.querySelector('.form_new-card');
const cardInputTitle = newCardForm.querySelector('.form__input-title');
const cardInputLink = newCardForm.querySelector('.form__input-link');
const cardAddButton = content.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup-add-new-card');
const CardCreateForm = popupAddCard.querySelector('.form_new-card');
const profileName = content.querySelector('.profile__name');
const profileDescription = content.querySelector('.profile__status');

// Работа по добавлению карточки
// Добавление элементов массива (Информация для карточек) в cardContainer
initialCards.forEach(function (item) {
  cardsContainer.append(createCard(item.name, item.link));
});

// Слушатель клика для всех кнопок закрытия popup
popupCloseButtons.forEach((button) => {
  const activePopup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(activePopup));
});

// Работа по редактированию профиля
// Cлушатель открытия popup формы редактироания профиля
profileEditButton.addEventListener('click', function () {
  openPopup(ProfileEditForm);
  profileInputName.value = profileName.textContent;
  profileInputDescription.value = profileDescription.textContent;
});

// Слушатель сабмита формы редактировнаия профиля 
ProfileEditForm.addEventListener('submit', handleProfileFormSubmit);

// Cлушатель открытия popup формы добавления карточки
cardAddButton.addEventListener('click', () => openPopup(popupAddCard));

// Функция добавления карточки в DOM (В начало cardsContainer)
function addCard(cardElement) {
  cardsContainer.prepend(cardElement);
}

// слушатель сабмита модального окна создания карточки 
CardCreateForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const newCardByUser = createCard(cardInputTitle.value, cardInputLink.value);
  addCard(newCardByUser);
  evt.target.reset();
  closePopup(popupCard);
});

// Общая валидация
enableValidation(validationSettings);