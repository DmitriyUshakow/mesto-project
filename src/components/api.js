// Импорты
import { profileInputName, profileDescription, profileAvatar, name, description} from "./utils.js";
import { createCard } from "./card";

export const content = document.querySelector('.content');
export const cardsContainer = content.querySelector('.card');
export const popupCard = document.querySelector('.popup-add-new-card');
export const newCardForm = popupCard.querySelector('.form_new-card');
export const cardInputTitle = newCardForm.querySelector('.form__input-title');
export const cardInputLink = newCardForm.querySelector('.form__input-link');


// Функция загрузки карточек с сервера.
export function renderCards() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-14/cards', {
    headers: {
      authorization: '203d2289-7df9-43d0-8e30-001c0bc1395a' // Мой токен
    }
  })
  .then(res => res.json())
  .then((data) => {
    data.forEach((item) => {
      cardsContainer.append(createCard(item.name,item.link));
    });
  });
}

// Функция отправки новой карточки на сервер
export function newCard() {
  fetch('https://nomoreparties.co/v1/plus-cohort-14/cards', {
    method: 'POST',
    headers: {
      authorization: '203d2289-7df9-43d0-8e30-001c0bc1395a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardInputTitle.value,
      link: cardInputLink.value
    })
  });
}

// Функция загрузки информаии о пользователе с сервера
export function renderInfo() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-14/users/me', {
    headers: {
      authorization: '203d2289-7df9-43d0-8e30-001c0bc1395a'
    }
  })
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    profileInputName.textContent = data.name;
    profileDescription.textContent = data.about;
    profileAvatar.src = data.avatar;
    });
}

// Функция загрузка информации о пользователе на сервер
export function newInfo() {
fetch('https://nomoreparties.co/v1/plus-cohort-14/users/me', {
  method: 'PATCH',
  headers: {
    authorization: '203d2289-7df9-43d0-8e30-001c0bc1395a',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: name.value,
    about: description.value
  })
});
}