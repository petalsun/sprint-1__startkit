import '../pages/index.css';
import { enableValidation} from './validate.js';
import { createCard } from './card.js';
import { openModal, closeModal } from './modal.js';

import { getInitialCards, editProfile, addNewCard, getUserInfo, editImage } from './api.js';


const placesList = document.querySelector('.places__list');

const popupProfileEdit = document.querySelector('.popup_type_edit');
const profileFormElement = document.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonCloseProfilePopup = popupProfileEdit.querySelector('.popup__close');
const buttonSaveProfile = profileFormElement.querySelector('.popup__button');

const popupCardAdd = document.querySelector('.popup_type_new-card');
const buttonAddCard = document.querySelector('.profile__add-button');
const cardFormElement = popupCardAdd.querySelector('.popup__form');
const placeNameInput = popupCardAdd.querySelector('.popup__input_type_card-name');
const linkInput = popupCardAdd.querySelector('.popup__input_type_url');
const buttonCloseCardPopup = popupCardAdd.querySelector('.popup__close');
const buttonSaveCard = cardFormElement.querySelector('.popup__button');

const popupImage = document.querySelector('.popup_type_image');
const buttonCloseImagePopup = popupImage.querySelector('.popup__close');
const imageInPopup = popupImage.querySelector('.popup__image');
const imageInPopupCaption = popupImage.querySelector('.popup__caption');

const profileImagePopup = document.querySelector('.popup_type_profile-image');
const profileImageForm = profileImagePopup.querySelector('.popup__form');
const imageLink = profileImageForm.querySelector('.popup__input_type_image-url');
const buttonCloseProfileImagePopup = profileImagePopup.querySelector('.popup__close');
const buttonSaveProfileImage = profileImageForm.querySelector('.popup__button');
const profileImage = document.querySelector('.profile__image');

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    loadingAnswer(true, buttonSaveProfile)
    editProfile(nameInput.value, jobInput.value)
        .then(() => {
            document.querySelector('.profile__title').textContent = nameInput.value;
            document.querySelector('.profile__description').textContent = jobInput.value; 
            closeModal(popupProfileEdit, validationSettings)
        })
        .catch((err) => console.log(err))
        .finally(() => loadingAnswer(false, buttonSaveProfile));
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    loadingAnswer(true, buttonSaveCard)
    addNewCard(placeNameInput.value, linkInput.value)
        .then((newCard) => {
            placesList.prepend(createCard(
                newCard.name,
                newCard.link,
                newCard.name,
                popupImage,
                imageInPopup,
                imageInPopupCaption,
                newCard.likes,
                newCard.owner._id,
                newCard.owner._id,
                newCard._id,
            ));
            closeModal(popupCardAdd, validationSettings);
            addDefaultCardValues();
        })
        .catch((err) => console.log(err))
        .finally(() => loadingAnswer(false, buttonSaveCard));
}

function handleImageFormSubmit(evt) {
    evt.preventDefault();
    loadingAnswer(true, buttonSaveProfileImage);
    
    editImage(imageLink.value)
        .then(() => {
            profileImage.style.backgroundImage = `url(${imageLink.value})`;
            closeModal(profileImagePopup, validationSettings);
        })
        .catch((err) => console.log(err))
        .finally(() => loadingAnswer(false, buttonSaveProfileImage));
}

function addDefaultProfileValues() {
    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
}

function addDefaultCardValues() {
    if (placeNameInput.value) placeNameInput.value = '';
    if (linkInput.value) linkInput.value = '';
}

function addDefaultEditImageValues() {
    if (imageLink.value) imageLink.value = '';
}

function loadingAnswer(isLoading, button) {
    if (isLoading) {
        button.textContent = 'Сохранение...';
    } else {
        button.textContent = 'Сохранить';
    }
}

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

profileImage.addEventListener('click', () => {
    addDefaultEditImageValues();
    openModal(profileImagePopup, validationSettings);
})

buttonCloseProfileImagePopup.addEventListener('click', () => {
    closeModal(profileImagePopup, validationSettings);
    addDefaultEditImageValues();
})

buttonCloseImagePopup.addEventListener('click', () => closeModal(popupImage, validationSettings));

profileFormElement.addEventListener('submit', handleProfileFormSubmit); 
cardFormElement.addEventListener('submit', handleCardFormSubmit);
profileImageForm.addEventListener('submit', handleImageFormSubmit);

popupProfileEdit.classList.add('popup_is-animated');
popupCardAdd.classList.add('popup_is-animated');
popupImage.classList.add('popup_is-animated');
profileImagePopup.classList.add('popup_is-animated');

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

// api

getUserInfo()
    .then((result) => {
        console.log(result);
        document.querySelector('.profile__title').textContent = result.name;
        document.querySelector('.profile__description').textContent = result.about;
        profileImage.style.backgroundImage = `url(${result.avatar})`;
    })
    .catch((err) => console.log(err));


getInitialCards()
    .then((result) => {
        console.log(result);
        getUserInfo()
            .then((user) => {
                result.forEach(card => {
                    placesList.append(createCard(
                        card.name,
                        card.link, 
                        card.name,
                        popupImage, 
                        imageInPopup, 
                        imageInPopupCaption,
                        card.likes,
                        card.owner._id,
                        user._id,
                        card._id
                    ));
        })});
    })
    .catch((err) => console.log(err));

enableValidation(validationSettings);