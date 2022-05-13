// Массив из карточек для вёрстки
const initialCards = [
  {
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

// Получаем общий контейнер верстки
const content = document.querySelector('.content');
// Получаем котнейнер для карточек
const cardsContainer = content.querySelector('.card');


// Функция добавления карточки в DOM (В конец cardsContainer)
function addCard (cardElement) {
  cardsContainer.prepend(cardElement);  
};

// Функция создания новой карточки  
function createCard(cardTitle, cardImage) {
  // Получаем template элемент (Разметка карточки)
  const cardTemplate = document.querySelector('#card-template').content;
  // Из cardTemlate копируем саму разметку карточки .card__item
  const cardElement = cardTemplate.querySelector('.card__item').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardTitle;
  cardElement.querySelector('.card__image').src = cardImage;
  cardElement.querySelector('.card__image').alt = cardTitle;
  
  // Удаление карточки
  deleteCardButton = cardElement.querySelector('.card__delete-button');
  deleteCardButton.addEventListener('click', function(evt) {
  evt.target.closest('.card__item').remove();
  });
  
  // Кнопка лайка
  likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', function(evt) {
  evt.target.classList.toggle('card__like-button_active');
  });

  // Попап открытия картинки
  cardElement.querySelector('.card__image').addEventListener('click', function() {
    document.querySelector('.popup__image').classList.toggle('popup_opened');
    document.querySelector('.popup__image-content').src = cardImage;
    document.querySelector('.popup__image-content').alt = cardTitle;
    document.querySelector('.popup__image-title').textContent = cardTitle;
  });

  
  // Результат работы функции:
  return cardElement;
};

// Цикл добавления элементов массива в cardElement
for (let i = 0; i < initialCards.length; i++) {
  //Вызываем функцию создания карточки 
  newElement = createCard(initialCards[i].name, initialCards[i].link);
  // вызываем функцию добавления в DOM
  addCard(newElement);
};

// Открытие и закртие формы редактирования профиля 
// Получаем кнопку открытия popup формы редактироания профиля
const editProfileOpenButton = content.querySelector('.profile__edit-button');
// Получаем кнопку закрытия popup формы редактироания профиля
const editProfileCloseButton = document.querySelector('.popup__close-button_edit-profile');
// Получаем popup редактирования профайла
const editProfileForm = document.querySelector('.popup-edit-profile');

//функция открытия/закрытия popup
function popupStatus(button, element) {
  button.addEventListener('click', function() {
    element.classList.toggle('popup_opened');
  });
}

// Вызвываем функцию открытия popup формы редактироания профиля
popupStatus(editProfileOpenButton, editProfileForm);
// Вызвываем функцию закрытия popup формы редактироания профиля
popupStatus(editProfileCloseButton, editProfileForm);

// Вызываем функцию закрытия окна popup изображений
popupImage = document.querySelector('.popup__image');
imageCloseButton = popupImage.querySelector('.popup__image-close');
popupStatus(imageCloseButton, popupImage);

// Отправка данных формы редактирования профиля
formElement = document.querySelector('.form_edit-profile');
const nameInput = document.querySelector('.form__input-name');
const jobInput = document.querySelector('.form__input-job');
const submitButton = editProfileForm.querySelector('.form__button');

function formSubmitHandler (evt) {
  evt.preventDefault();
  content.querySelector('.profile__name').textContent = nameInput.value;
  content.querySelector('.profile__status').textContent = jobInput.value;
  editProfileForm.classList.remove('popup_opened');
};

submitButton.addEventListener('click', formSubmitHandler);

// Открытие и закрытие popup-формы добавления новой карточки
// Получаем кнопку добаления новой карточки
const AddCardButton = content.querySelector('.profile__add-button');
// Получаем popup добавления новой карточки
const popupAddCard = document.querySelector('.popup-add-new-card');
// Получаем кнопку закрытия карточки
const closeCardButton = popupAddCard.querySelector('.popup__close-button');

// Вызвываем функцию открытия popup формы добавления карточки
popupStatus(AddCardButton, popupAddCard);
// Вызвываем функцию закрытия popup формы добавления карточки
popupStatus(closeCardButton, popupAddCard);

// Добавлние новых карточек через форму
popupCard = document.querySelector('.popup-add-new-card');
newCardForm = popupCard.querySelector('.form_new-card');
inputTitleCard = newCardForm.querySelector('.form__input-title');
inputLinkCard = newCardForm.querySelector('.form__input-link');
cardButton = newCardForm.querySelector('.form__button');

cardButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  newCardByUser = createCard(inputTitleCard.value, inputLinkCard.value);
  addCard(newCardByUser);
  inputTitleCard.value = '';
  inputLinkCard.value = '';
  popupCard.classList.remove('popup_opened');
});
