import '../pages/index.css';
import { initialCards } from './cards.js';
import { enableValidation} from './validate.js';
import { createCard } from './card.js';
import { openModal, closeModal } from './modal.js';

const placesList = document.querySelector('.places__list');

const popupProfileEdit = document.querySelector('.popup_type_edit');
const profileFormElement = document.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonCloseProfilePopup = popupProfileEdit.querySelector('.popup__close');

const popupCardAdd = document.querySelector('.popup_type_new-card');
const buttonAddCard = document.querySelector('.profile__add-button');
const cardFormElement = popupCardAdd.querySelector('.popup__form');
const placeNameInput = popupCardAdd.querySelector('.popup__input_type_card-name');
const linkInput = popupCardAdd.querySelector('.popup__input_type_url');
const buttonCloseCardPopup = popupCardAdd.querySelector('.popup__close');
const buttonSaveCardPopup = popupCardAdd.querySelector('.popup__button');

const imagePopup = document.querySelector('.popup_type_image');
const buttonCloseImagePopup = imagePopup.querySelector('.popup__close');
const imageInPopup = imagePopup.querySelector('.popup__image');
const imageInPopupCaption = imagePopup.querySelector('.popup__caption');


function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
    closeModal(popupProfileEdit, validationSettings)
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    placesList.prepend(createCard(placeNameInput.value, linkInput.value, placeNameInput.value, imagePopup, imageInPopup, imageInPopupCaption));
    buttonSaveCardPopup.addEventListener('click', closeModal(popupCardAdd, validationSettings));
    addDefaultCardValues();
}

function addDefaultProfileValues() {
    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
}

function addDefaultCardValues() {
    if (placeNameInput.value) placeNameInput.value = '';
    if (linkInput.value) linkInput.value = '';
}
  
initialCards.forEach(card => {
    placesList.append(createCard(card.name, card.link, card.alt, imagePopup, imageInPopup, imageInPopupCaption));
});

buttonEditProfile.addEventListener('click', function() {
    addDefaultProfileValues();
    openModal(popupProfileEdit, validationSettings);
});

buttonCloseProfilePopup.addEventListener('click', function() {
    closeModal(popupProfileEdit, validationSettings);
})

buttonAddCard.addEventListener('click', () => {
    addDefaultCardValues();
    openModal(popupCardAdd, validationSettings);
});

buttonCloseCardPopup.addEventListener('click', function() {
    closeModal(popupCardAdd, validationSettings);
    addDefaultCardValues();
});

buttonCloseImagePopup.addEventListener('click', () => closeModal(imagePopup, validationSettings));

profileFormElement.addEventListener('submit', handleProfileFormSubmit); 

cardFormElement.addEventListener('submit', handleCardFormSubmit);

popupProfileEdit.classList.add('popup_is-animated');
popupCardAdd.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

enableValidation(validationSettings);