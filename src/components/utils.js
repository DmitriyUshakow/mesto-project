const profileEditForm = document.querySelector('.popup-edit-profile');
const profileName = content.querySelector('.profile__name');
const profileDescription = content.querySelector('.profile__status');
const profileInputName = document.querySelector('.form__input-name');
const profileInputDescription = document.querySelector('.form__input-job');

// Общая функция сабмита в формах
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileInputName.value;
  profileDescription.textContent = profileInputDescription.value;
  closePopup(profileEditForm);
}

export {handleProfileFormSubmit};