// Импортируем файл стилей
import '../styles/index.css';

import {
renderCards,
renderInfo,
cardsContainer,
cardInputLink,
cardInputTitle,
popupCard,
newCard,
updateAvatar
} from './api';

import {
  openPopup,
  closePopup
} from './modal';

import {
  handleProfileFormSubmit,
  profileAvatarContainer,
  renderLoading,
  disableButton
} from './utils';

import {createCard} from './card';

import {
  enableValidation,
  validationSettings
} from './validate';

const content = document.querySelector('.content');
const profileEditButton = content.querySelector('.profile__edit-button');
const profileEditForm = document.querySelector('.popup-edit-profile');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const profileInputName = document.querySelector('.form__input-name');
const profileInputDescription = document.querySelector('.form__input-job');
const cardAddButton = content.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup-add-new-card');
const cardCreateForm = popupAddCard.querySelector('.form_new-card');
const profileName = content.querySelector('.profile__name');
const profileDescription = content.querySelector('.profile__status');
const popupEditAvatar = document.querySelector('.popup-edit-avatar');
const avatarEditForm = document.querySelector('.form_edit-avatar');
const avatar = document.querySelector('.profile__avatar');
const avatarURL = avatarEditForm.querySelector('.form__input');

export let userId ="";

// Как только придет информация от сервера по renderInfo и RenderCard
// 
Promise.all([renderInfo(), renderCards()])
  .then(([userData, data]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    avatar.src = userData.avatar;
    userId = userData._id; //?
    renderInitialCards(data);
  })
  .catch((error) => console.log(`Ошибка при рендере карточек и информации профиля${error}`));

function renderInitialCards(data) {
  data.forEach((item) => {
    cardsContainer.append(createCard(item.name, item.link, item.likes, item._id, item.owner, userId));
  });
}

profileAvatarContainer.addEventListener('click', () => {
  console.log(profileAvatarContainer);
  openPopup(popupEditAvatar);
});

avatarEditForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(true, evt.submitter);

  console.log(avatarURL.value);
  updateAvatar(avatarURL.value)
    .then(() => {
      avatar.src = avatarURL.value;
      disableButton(evt.submitter);
      closePopup(popupEditAvatar);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt.submitter);
    });
});


// Слушатель клика для всех кнопок закрытия popup
popupCloseButtons.forEach((button) => {
  const activePopup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(activePopup));
});

// Работа по редактированию профиля
// Cлушатель открытия popup формы редактироания профиля
profileEditButton.addEventListener('click', function () {
  openPopup(profileEditForm);
  profileInputName.value = profileName.textContent;
  profileInputDescription.value = profileDescription.textContent;
});

// Слушатель сабмита формы редактировнаия профиля 
profileEditForm.addEventListener('submit', handleProfileFormSubmit);

// Cлушатель открытия popup формы добавления карточки
cardAddButton.addEventListener('click', () => {
  openPopup(popupAddCard);
  const formSubmit = popupAddCard.querySelector('.form__submit');
  disableButton(formSubmit);
});

// Функция добавления карточки в DOM (В начало cardsContainer)
function addCard(cardElement) {
  cardsContainer.prepend(cardElement);
}

// слушатель сабмита модального окна создания карточки 
cardCreateForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  renderLoading(true, evt.submitter);
  newCard(cardInputTitle.value, cardInputLink.value)
    .then((result) => {
      const myCard = createCard(result.name, result.link,  result.likes, result._id, result.owner,userId);
      addCard(myCard);
      disableButton(evt.submitter);
      closePopup(popupCard);
      evt.target.reset(popupCard);
    })
    .catch((err) => {
      console.log(`Ошибка при отправке данных карточки  ${err}`);
    })
    .finally(() => {
      renderLoading(false, evt.submitter);
    });
});

// Общая валидация
enableValidation(validationSettings);