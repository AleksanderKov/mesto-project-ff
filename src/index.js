import './index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

// Модальное окно редактирования профиля
const editModalElement = document.querySelector('.popup_type_edit');
const openEditButton = document.querySelector('.profile__edit-button');
const closeEditButton = editModalElement.querySelector('.popup__close');

// Форма редактирования профиля и поля ввода
const profileForm = document.querySelector('.popup__form');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');

// Элементы профиля на странице
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Попап с изображением
const imagePopup = document.querySelector('.popup_type_image');

// Контейнер карточек
const list = document.querySelector('.places__list');

// Модальное окно добавления карточки
const newCardModal = document.querySelector('.popup_type_new-card');
const openNewCardButton = document.querySelector('.profile__add-button');
const closeNewCardButton = newCardModal ? newCardModal.querySelector('.popup__close') : null;

// Функция открытия попапа с изображением
function openImagePopup(imageSrc, imageAlt) {
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');

  if (imagePopup) {
    popupImage.src = imageSrc;
    popupImage.alt = imageAlt;
    popupCaption.textContent = imageAlt;
    openModal(imagePopup);

    const closeImageButton = imagePopup.querySelector('.popup__close');
    if (closeImageButton) {
      closeImageButton.addEventListener('click', () => closeModal(imagePopup));
    }
    imagePopup.addEventListener('click', (event) => {
      if (event.target === imagePopup) {
        closeModal(imagePopup);
      }
    });
  }
}

// Обработчик отправки формы редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;
  const popup = evt.target.closest('.popup');
  if (popup) {
    closeModal(popup);
  }
}

// Обработчики для модального окна редактирования профиля
openEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editModalElement);
});
closeEditButton.addEventListener('click', () => {
  closeModal(editModalElement);
});
editModalElement.addEventListener('click', (event) => {
  if (event.target === editModalElement) {
    closeModal(editModalElement);
  }
});

// Обработчик отправки формы редактирования профиля
profileForm.addEventListener('submit', handleFormSubmit);

// Обработчики для модального окна добавления новой карточки (если окно существует)
if (newCardModal) {
  openNewCardButton.addEventListener('click', () => {
    openModal(newCardModal);
  });
  closeNewCardButton.addEventListener('click', () => {
    closeModal(newCardModal);
  });
  newCardModal.addEventListener('click', (event) => {
    if (event.target === newCardModal) {
      closeModal(newCardModal);
    }
  });
}

// Обработчик отправки формы добавления карточки
const newCardForm = document.querySelector('.popup__form[name="new-place"]');
newCardForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const placeName = newCardForm.querySelector('input[name="place-name"]').value;
  const link = newCardForm.querySelector('input[name="link"]').value;
  const newCard = { name: placeName, link: link };
  initialCards.unshift(newCard);
  const cardElement = createCard(newCard, deleteCard, likeCard, openImagePopup);
  list.prepend(cardElement);
  newCardForm.reset();
  const popup = newCardForm.closest('.popup');
  if (popup) {
    closeModal(popup);
  }
});

// Добавление начальных карточек
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard, likeCard, openImagePopup);
  list.append(cardElement);
});