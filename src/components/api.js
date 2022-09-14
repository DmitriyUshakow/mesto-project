export const content = document.querySelector('.content');
export const cardsContainer = content.querySelector('.card');
export const popupCard = document.querySelector('.popup-add-new-card');
export const newCardForm = popupCard.querySelector('.form_new-card');
export const cardInputTitle = newCardForm.querySelector('.form__input-title');
export const cardInputLink = newCardForm.querySelector('.form__input-link');

// Объект авторизации
export const config = {
  baseURL: 'https://nomoreparties.co/v1/plus-cohort-14',
  headers: {
    authorization: "203d2289-7df9-43d0-8e30-001c0bc1395a",
    "Content-Type": "application/json"
  }
};

// Функцция проверки ответа от сервера (Уже возвращает объъект ответа от сервера)
export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так, ошибка: ${res.status, res.status.text}`);
}

// Функция загрузки карточек с сервера. (Потом будем вызывать?)
export function renderCards() {
  return fetch(`${config.baseURL}/cards`, {
    headers: config.headers
  })
  .then(checkResponse);
}

// Функция отправки новой карточки на сервер (Потом будем вызывать?)
export function newCard(name, link) {
  return fetch(`${config.baseURL}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(checkResponse);
}

// Функция загрузки информаии о пользователе с сервера
export function renderInfo() {
  return fetch(`${config.baseURL}/users/me`, {
    headers: config.headers
  })
  .then(checkResponse);
}

// Функцция загрузки информации о пользователе на сервер
export const newInfo = (name, about) => {
  return fetch(`${config.baseURL}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    }),
  }).then(checkResponse);
};

// Обновление Аватара
export const updateAvatar = (avatar) => {
  return fetch(`${config.baseURL}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar, //
    }),
  }).then(checkResponse);
};

// Функццция удаления карточки с сервера
export const deleteCard = (cardId) => {
  return fetch(`${config.baseURL}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};

// Функция установки Лайка
export const likeCard = (cardId) => {
  return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
};

// Функция удаления лайка 
export const removeLikeCard = (cardId) => {
  return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};