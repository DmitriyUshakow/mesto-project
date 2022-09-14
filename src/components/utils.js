import { closePopup } from "./modal";
import { newInfo } from "./api";

const content = document.querySelector('.content');
const profileEditForm = document.querySelector('.popup-edit-profile');
const profileName = content.querySelector('.profile__name');
const profileDescription = content.querySelector('.profile__status');
const profileInputName = document.querySelector('.form__input-name');
const profileInputDescription = document.querySelector('.form__input-job');
const profileAvatarContainer = document.querySelector('.profile__image');

// изменение кнопки во время загрузки
export function renderLoading(isLoading, button, buttonText = "Сохранить", buttonTextOnLoad) {
  if (isLoading) {
    button.textContent = buttonTextOnLoad;
  } else {
    button.textContent = buttonText;
  }
}

// Общая функция сабмита в формах
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt.submitter);
  newInfo(profileInputName.value, profileInputDescription.value)
  .then(() => {
    profileName.textContent = profileInputName.value;
    profileDescription.textContent = profileInputDescription.value;
    closePopup(profileEditForm);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false, evt.submitter);
  });
};

export function disableButton(button) {
  button.classList.add("form__submit_inactive");
  button.setAttribute('disabled', "");
}

export {handleProfileFormSubmit, profileInputName, profileDescription, profileAvatarContainer};
