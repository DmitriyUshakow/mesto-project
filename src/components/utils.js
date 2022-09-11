import { closePopup } from "./modal";

const content = document.querySelector('.content');
const profileEditForm = document.querySelector('.popup-edit-profile');
const profileName = content.querySelector('.profile__name');
const profileDescription = content.querySelector('.profile__status');
const profileInputName = document.querySelector('.form__input-name');
const profileInputDescription = document.querySelector('.form__input-job');
const profileAvatar = document.querySelector('.profile__avatar');

// Общая функция сабмита в формах
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileInputName.value;
  profileDescription.textContent = profileInputDescription.value;
  closePopup(profileEditForm);
}

export {handleProfileFormSubmit, profileInputName, profileDescription, profileAvatar};