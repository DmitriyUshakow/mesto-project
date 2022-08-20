// Массив из карточек для вёрстки
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

const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.card');
const cardTemplate = document.querySelector('#card-template').content;
const popupImage = document.querySelector('.popup__image');
const popupImageContent = popupImage.querySelector('.popup__image-content');
const popupImageTitle = popupImage.querySelector('.popup__image-title');
const editProfileOpenButton = content.querySelector('.profile__edit-button');
const editProfileCloseButton = document.querySelector('.popup__close-button_edit-profile');
const editProfileForm = document.querySelector('.popup-edit-profile');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const imageCloseButton = popupImage.querySelector('.popup__image-close');
const formEditProfile = document.querySelector('.form_edit-profile');
const nameInput = document.querySelector('.form__input-name');
const jobInput = document.querySelector('.form__input-job');
const popupCard = document.querySelector('.popup-add-new-card');
const newCardForm = popupCard.querySelector('.form_new-card');
const inputTitleCard = newCardForm.querySelector('.form__input-title');
const inputLinkCard = newCardForm.querySelector('.form__input-link');
const addCardButton = content.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup-add-new-card');
const createCardForm = popupAddCard.querySelector('.form_new-card');
const closeCardButton = popupAddCard.querySelector('.popup__close-button');
const profileName = content.querySelector('.profile__name');
const profileStatus = content.querySelector('.profile__status');

// Общая функция c механизмом открытия окна popup
function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  // Слушатели нажатия Esc и клика по Overlay
  document.addEventListener('keydown', handleHotkey);
  document.addEventListener('click', handleOverlayClick);
};

// Общая функция c механизмом закрытия окна popup
function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  // Убираем слушатели нажатия Esc и клика по Overlay
  document.removeEventListener('keydown', handleHotkey);
  document.removeEventListener('click', handleOverlayClick);
};

// Прослушиватель открытия popup формы редактироания профиля
editProfileOpenButton.addEventListener('click', function () {
  openPopup(editProfileForm);
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
});

// cлушатель открытия popup формы добавления карточки
addCardButton.addEventListener('click', function () {
  openPopup(popupAddCard);
});

popupCloseButtons.forEach((button) => {
  const ActivePopup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(ActivePopup));
});

//Функция закрытия окна Popup клавишей ESC
  function handleHotkey(evt) {
  //Новая переменная открытого окна popup
  const activePopup = document.querySelector('.popup_opened');
  if (evt.key == 'Escape') {
    closePopup(activePopup);
  };
};

//Функция закрытия окна Popup кликом на Overlay
function handleOverlayClick(evt) {
  //Новая переменная открытого окна popup
  const activePopup = document.querySelector('.popup_opened');
  if (evt.target === activePopup) {
    closePopup(activePopup);
  };
};

// Функция добавления карточки в DOM (В начало cardsContainer)
function addCard(cardElement) {
  cardsContainer.prepend(cardElement);
};

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
};

// Добавление элементов массива в cardContainer
initialCards.forEach(function (item) {
  cardsContainer.append(createCard(item.name, item.link));
});

// Отправка данных формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  closePopup(editProfileForm);
};

formEditProfile.addEventListener('submit', handleProfileFormSubmit);

// Добавлние новых карточек через форму
createCardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const newCardByUser = createCard(inputTitleCard.value, inputLinkCard.value);
  addCard(newCardByUser);
  evt.target.reset();
  closePopup(popupCard);
});