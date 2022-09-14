// Импорт функций по открытию и закртию попап
import { openPopup, closePopup } from "./modal";
import {
  deleteCard,
  likeCard,
  removeLikeCard,
} from "./api";

// Константы
const cardTemplate = document.querySelector('#card-template').content;
const popupImage = document.querySelector('.popup__image');
const popupImageContent = popupImage.querySelector('.popup__image-content');
const popupImageTitle = popupImage.querySelector('.popup__image-title');

// Функция создания новой карточки  
function createCard(cardTitleName, cardImageLink, likes, _id, owner, userId) {
  const cardElement = cardTemplate.querySelector('.card__item').cloneNode(true); // Разметку карточки .card__item
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');

  cardTitle.textContent = cardTitleName;
  cardImage.src = cardImageLink;
  cardImage.alt = cardTitleName;
  cardLikeCounter.textContent = likes.length;

  // Слушатель лайка
  cardLikeButton.addEventListener('click', checkLike(cardElement, _id, cardLikeCounter));


  if (likes.some((user) => user._id === userId)) {
    cardLikeButton.classList.add("card__like-button_active");
  }

  if (owner._id !== userId) {
    cardDeleteButton.classList.add("card__delete-button_disabled");
  }

  cardDeleteButton.addEventListener("click", (evt) => {
    deleteCard(_id)
      .then(() => {
        evt.target.closest(".card__item").remove();
      })
      .catch((err) => {
        console.log(err);
      });
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

// Установка лайка на карточке
function likeThisCard(cardLikeButton, _id, cardLikeCounter) {
  likeCard(_id) //Получаем данные количества лайков конкретной карточки на сервере
    .then((res) => {
      cardLikeCounter.textContent = res.likes.length;
      cardLikeButton.classList.add("card__like-button_active");
    })
    .catch((err) => console.log(err));
}

// Убирает лайк на карточке
function dislikeThisCard(cardLikeButton, _id, cardLikeCounter) {
  removeLikeCard(_id)
    .then((res) => {
      cardLikeCounter.textContent = res.likes.length; //Передаем нашему счетчику количество лайков на сервере
      cardLikeButton.classList.remove("card__like-button_active"); //Убираем лайк
    })
    .catch((err) => console.log(err));
}

// Функция проверки состояния лайка
const checkLike = (cardElement, _id, cardLikeCounter) => () => {
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    if (cardLikeButton.classList.contains('card__like-button_active')) {
      dislikeThisCard(cardLikeButton, _id, cardLikeCounter);
    } else {
      likeThisCard(cardLikeButton, _id, cardLikeCounter);
    }
  }

export {createCard}; 
// Экспортируем функцию создания карточки и массив с данными
