import { openModal } from "./modal";

function createCard(name, link, alt, imagePopup, imageInPopup, imageInPopupCaption) {
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);

    card.querySelector('.card__image').src = link;
    card.querySelector('.card__image').alt = alt;
    card.querySelector('.card__title').textContent = name;

    const cardLike = card.querySelector('.card__like-button');
    cardLike.addEventListener('click', (e) => e.target.classList.toggle('card__like-button_is-active'));
    
    const cardImage = card.querySelector('.card__image');
    cardImage.addEventListener('click', (e) => {
        openModal(imagePopup, null);
        imageInPopup.src = e.target.src;
        imageInPopup.alt = e.target.alt;
        imageInPopupCaption.textContent = name;
    });

    const cardDelete = card.querySelector('.card__delete-button');
    cardDelete.addEventListener('click', (e) => e.target.closest('.card').remove());
    
    return card;
}

export {createCard}