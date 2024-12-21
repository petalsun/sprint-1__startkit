import { resetFormErrors } from "./validate";

function isKeyEscape(evt) {
    const popup = document.querySelector('.popup_is-opened');
    if (evt.key == 'Escape' && popup) {
        popup.classList.remove('popup_is-opened');
    }
}

function isOverlay(evt) {
    if (evt.currentTarget == evt.target) {
        evt.target.classList.remove('popup_is-opened');
    }
}

function openModal(popup, validationSettings) {      
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', isKeyEscape);
    popup.addEventListener('click', isOverlay);
    if (validationSettings) {
        const popupButton = popup.querySelector(validationSettings.submitButtonSelector);
        const popupForm = popup.querySelector(validationSettings.formSelector);
        resetFormErrors(popupForm, popupButton, validationSettings);
    }
}

function closeModal(popup, validationSettings) {      
    popup.classList.remove('popup_is-opened');
    const popupButton = popup.querySelector(validationSettings.submitButtonSelector);
    const popupForm = popup.querySelector(validationSettings.formSelector);
    document.removeEventListener('keydown', isKeyEscape);
    popup.removeEventListener('click', isOverlay);
    resetFormErrors(popupForm, popupButton, validationSettings);
}

export {openModal, closeModal}