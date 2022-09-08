// Импортируем файл стилей
import '../styles/index.css';

// Импортируем функцию создания карточки
import {openPopup, closePopup} from './modal';
import {handleProfileFormSubmit} from './utils';
import {createCard, initialCards} from './card';
import {enableValidation} from './validate';

// const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.card');
// const cardTemplate = document.querySelector('#card-template').content;
// const popupImage = document.querySelector('.popup__image');
// const popupImageContent = popupImage.querySelector('.popup__image-content');
// const popupImageTitle = popupImage.querySelector('.popup__image-title');
const ProfileEditButton = content.querySelector('.profile__edit-button');
// const editProfileCloseButton = document.querySelector('.popup__close-button_edit-profile');
const editProfileForm = document.querySelector('.popup-edit-profile');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
// const imageCloseButton = popupImage.querySelector('.popup__image-close');
// const formEditProfile = document.querySelector('.form_edit-profile');
const profileInputName = document.querySelector('.form__input-name');
const profileInputDescription = document.querySelector('.form__input-job');
// const popupCard = document.querySelector('.popup-add-new-card');
// const newCardForm = popupCard.querySelector('.form_new-card');
const cardInputTitle = newCardForm.querySelector('.form__input-title');
const cardInputLink = newCardForm.querySelector('.form__input-link');
const cardAddButton = content.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup-add-new-card');
// const createCardForm = popupAddCard.querySelector('.form_new-card');
// const closeCardButton = popupAddCard.querySelector('.popup__close-button');
const profileName = content.querySelector('.profile__name');
const profileDescription = content.querySelector('.profile__status');

// НАстройки для функции валидации
const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

// Слушатель клика для всех кнопок закрытия popup
popupCloseButtons.forEach((button) => {
  const activePopup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(activePopup));
});

// Работа по редактированию профиля
// Cлушатель открытия popup формы редактироания профиля
ProfileEditButton.addEventListener('click', function () {
  openPopup(editProfileForm);
  profileInputName.value = profileName.textContent;
  profileInputDescription.value = profileDescription.textContent;
});

// Слушатель сабмита формы редактировнаия профиля 
editProfileForm.addEventListener('submit', handleProfileFormSubmit);

// Работа по добавлению карточки
// Добавление элементов массива (Информация для карточек) в cardContainer
initialCards.forEach(function (item) {
  cardsContainer.append(createCard(item.name, item.link));
});

// Cлушатель открытия popup формы добавления карточки
cardAddButton.addEventListener('click', () => openPopup(popupAddCard));

// Функция добавления карточки в DOM (В начало cardsContainer)
function addCard(cardElement) {
  cardsContainer.prepend(cardElement);
}

// слушатель сабмита модального окна создания карточки 
createCardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const newCardByUser = createCard(cardInputTitle.value, cardInputLink.value);
  addCard(newCardByUser);
  evt.target.reset();
  closePopup(popupCard);
});

// Общая валидация
enableValidation(validationSettings);