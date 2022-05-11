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

// цикл добавления элементов массива в cardElement
for (let i = 0; i < initialCards.length; i++) {
  // Получаем template элемент
  const cardTemplate = document.querySelector('#card-template').content;
  // Из cardTemlate копируем саму разметку карточки .card__item
  const cardElement = cardTemplate.querySelector('.card__item').cloneNode(true);

  // Функция добавления массива initialCards в вёрстку  
  function addCard() {
    cardElement.querySelector('.card__title').textContent = initialCards[i].name;
    cardElement.querySelector('.card__image').setAttribute('src', initialCards[i].link);
    // Добавляем в конец каждую карточку
    cardsContainer.append(cardElement);
  }
  // Вызываем функцию
  addCard();
}


