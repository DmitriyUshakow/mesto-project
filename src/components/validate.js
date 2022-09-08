// Валидация форм

// Функция показывает сообщение об ошибке:
const showInputError = (formElement, inputElement, errorMessage, validationSettings) => {
  // Находим элемент ошибки внутри самой функциции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSettings.errorClass);
};

// Функция скрывает сообщение об ошибке:
const hideInputError = (formElement, inputElement, validationSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationSettings.inputErrorClass);
  inputElement.classList.remove(validationSettings.errorClass);
  errorElement.textContent = '';
};

// Функция с механизмом валидации текстовых полей:
const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    // console.log(inputElement.validionMessage)
    showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
  } else {
    hideInputError(formElement, inputElement, validationSettings);
  };
};

// Функция проверяющая массив полей формы, и сигнализирующая о том валид ли массив полей input формы или нет
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Функция которая переключает состояние кнопки, при валидном или невалидном массиве input'ов формы
const toggleButtonState = (inputList, buttonElement, validationSettings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationSettings.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
  };
};

// Функция валидации всех полей форм:
const setEventListener = (formElement, validationSettings) => {
  // Найдем все поля ввода внутри внутри формы, сделав из них массив:
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  // Найдем submit в форме
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
  // Сделаем кнопку submit неактивной до начала валидации input'ов
  // Обойдем все элементы полученной коллекции:
  inputList.forEach((inputElement) => {
    // каждому добавим обработчик события input:
    inputElement.addEventListener('input', () => {
      // внутри коллбека вызовем функцию isValid, передав ей форму и проверяемый элемент:
      isValid(formElement, inputElement);
      // Проверка состояния inputov для переключения активности кнопки
      toggleButtonState(inputList, buttonElement, validationSettings); 
    });
  });
};

//Обработчик всем формам
const enableValidation = (validationSettings) => {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListener(formElement, validationSettings);
  });
}

export {enableValidation};