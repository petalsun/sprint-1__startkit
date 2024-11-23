const cardsContainer = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit'); 
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image'); 

// Формы и элементы формы для редактирования профиля
const profileForm = profilePopup.querySelector('.popup__form'); 
const nameInput = profileForm.querySelector('.popup__input_type_name'); 
const jobInput = profileForm.querySelector('.popup__input_type_description'); 
const profileTitle = document.querySelector('.profile__title'); 
const profileDescription = document.querySelector('.profile__description'); 

const profileEditButton = document.querySelector('.profile__edit-button'); 
const profileCloseButton = profilePopup.querySelector('.popup__close'); 

// Элементы формы добавления карточки
const cardForm = cardPopup.querySelector('.popup__form'); 
const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name'); 
const cardLinkInput = cardPopup.querySelector('.popup__input_type_url'); 
const cardAddButton = document.querySelector('.profile__add-button'); 
const cardCloseButton = cardPopup.querySelector('.popup__close'); 

// Элементы попапа с изображением
const popupImage = imagePopup.querySelector('.popup__image'); 
const imagePopupCaption = imagePopup.querySelector('.popup__caption'); 
const imageCloseButton = imagePopup.querySelector('.popup__close'); 

// Открытие попапа
function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

// Закрытие попапа
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}

// Функция создания карточки
function createCard(title, link, altText) {
    const template = document.querySelector('#card-template').content;
    const card = template.querySelector('.card').cloneNode(true);

    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const likeButton = card.querySelector('.card__like-button');
    const deleteButton = card.querySelector('.card__delete-button');

// Заполнение карточки
    cardTitle.textContent = title;
    cardImage.src = link; 
    cardImage.alt = altText; 

    // Лайк карточки
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active');
    });

    // Просмотр изображения
    cardImage.addEventListener('click', () => {
        popupImage.src = link;
        popupImage.alt = title;
        imagePopupCaption.textContent = title;
        openModal(imagePopup);
    });

    // Удаление карточки
    deleteButton.addEventListener('click', () => {
        card.remove();
    });

    return card;
}

// Функция обновления значений полей профиля
function updateProfileFields() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
}

// Обработчик отправки формы редактирования профиля
function handleProfileFormSubmit(event) {
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(profilePopup);
}

// Обработчик добавления новой карточки
function handleCardSubmit(event) {
    event.preventDefault();
    const newCard = createCard(cardNameInput.value, cardLinkInput.value, cardNameInput.value);
    cardsContainer.prepend(newCard);
    closeModal(cardPopup);
    cardNameInput.value = '';
    cardLinkInput.value = '';
}

// Добавление начальных карточек
initialCards.forEach(({ name, link, alt }) => {
    cardsContainer.append(createCard(name, link, alt));
});

// Обработчики профиля
profileEditButton.addEventListener('click', () => {
    updateProfileFields();
    openModal(profilePopup); // Обработчик открытия
});
profileCloseButton.addEventListener('click', () => closeModal(profilePopup)); // Обработчик закрытия
profileForm.addEventListener('submit', handleProfileFormSubmit); // Обработчик сохранения данных

// Закрытите попапа с картинкой
imageCloseButton.addEventListener('click', () => closeModal(imagePopup));

// Обработчик добавления карточки
cardAddButton.addEventListener('click', () => {
    cardNameInput.value = '';
    cardLinkInput.value = '';
    openModal(cardPopup);
});
cardCloseButton.addEventListener('click', () => closeModal(cardPopup));
cardForm.addEventListener('submit', handleCardSubmit);

// Добавление анимаций
[profilePopup, cardPopup, imagePopup].forEach((popup) => {
    popup.classList.add("popup_is-animated");
});
