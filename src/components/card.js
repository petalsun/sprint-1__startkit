import { openModal } from "./modal";
import { deleteCard, addLike, removeLike } from "./api";

function createCard(name, link, alt, imagePopup, imageInPopup, imageInPopupCaption, likesCount, cardOwnerId, userID, cardId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    
    if (cardOwnerId !== userID) {
        card.querySelector('.card__delete-button').classList.add('card__delete-button_inactive');
    }

    card.querySelector('.card__image').src = link;
    card.querySelector('.card__image').alt = alt;
    card.querySelector('.card__title').textContent = name;
    card.querySelector('.card__like-count').textContent = likesCount.length;

    const cardLike = card.querySelector('.card__like-button');
    const isLiked = (like) => like._id === userID;

    if (Array.from(likesCount).some(isLiked)) {
        cardLike.classList.add('card__like-button_is-active');
    }

    cardLike.addEventListener('click', (e) => {
        if (!e.target.classList.contains('card__like-button_is-active')) {
            addLike(cardId)
                .then((res) => {
                    e.target.classList.add('card__like-button_is-active');
                    card.querySelector('.card__like-count').textContent = res.likes.length;
                })
                .catch((err) => console.log(err));
        } else {
            removeLike(cardId)
                .then((res) => {
                    e.target.classList.remove('card__like-button_is-active');
                    card.querySelector('.card__like-count').textContent = res.likes.length;
                })
                .catch((err) => console.log(err));
        }
    });
    
    const cardImage = card.querySelector('.card__image');
    cardImage.addEventListener('click', (e) => {
        openModal(imagePopup, null);
        imageInPopup.src = e.target.src;
        imageInPopup.alt = e.target.alt;
        imageInPopupCaption.textContent = name;
    });

    const cardDelete = card.querySelector('.card__delete-button');
    cardDelete.addEventListener('click', (e) => {
        e.target.closest('.card').remove();
        deleteCard(cardId);
    });
    
    return card;
}

export {createCard}