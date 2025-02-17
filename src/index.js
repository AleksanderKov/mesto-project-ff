import './index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal, closeByOverlay } from './components/modal.js';

// Модальное окно редактирования профиля
const editModalElement = document.querySelector('.popup_type_edit');
const openEditButton = document.querySelector('.profile__edit-button');
const closeEditButton = editModalElement.querySelector('.popup__close');
const popup = document.querySelector('.popup_type_edit');

// Форма редактирования профиля и поля ввода
const profileForm = document.querySelector('.popup__form');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');

// Элементы профиля на странице
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Попап с изображением
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

// Контейнер карточек
const list = document.querySelector('.places__list');

// Модальное окно добавления карточки
const newCardModal = document.querySelector('.popup_type_new-card');
const openNewCardButton = document.querySelector('.profile__add-button');
const closeNewCardButton = newCardModal ? newCardModal.querySelector('.popup__close') : null;

// Объявляем форму добавления карточки
const newCardForm = document.querySelector('.popup__form[name="new-place"]');

openNewCardButton.addEventListener('click', () => {
  openModal(newCardModal);
});

if (closeNewCardButton) {
  closeNewCardButton.addEventListener('click', () => {
    closeModal(newCardModal);
  });
}

if (editModalElement) {
  editModalElement.addEventListener('click', closeByOverlay);
}

if (imagePopup) {
  imagePopup.addEventListener('click', closeByOverlay);
}

newCardModal.addEventListener('click', closeByOverlay);

// Функция открытия попапа с изображением
function openImagePopup(imageSrc, imageAlt) {
  if (imagePopup) {
    popupImage.src = imageSrc;
    popupImage.alt = imageAlt;
    popupCaption.textContent = imageAlt;
    openModal(imagePopup);
  }
}

// Обработчик закрытия попапа с изображением по кнопке "Закрыть"
const closeImageButton = imagePopup.querySelector('.popup__close');
if (closeImageButton) {
  closeImageButton.addEventListener('click', () => closeModal(imagePopup));
}

// Обработчик отправки формы редактирования профиля
function submitEditProfile(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;
  closeModal(popup);
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

// Назначаем обработчик для формы редактирования профиля
profileForm.addEventListener('submit', submitEditProfile);

// Функция-обработчик отправки формы добавления карточки
function submitAddCardForm(event) {
  event.preventDefault();
  const placeName = newCardForm.querySelector('input[name="place-name"]').value;
  const link = newCardForm.querySelector('input[name="link"]').value;
  const newCard = { name: placeName, link: link };
  const cardElement = createCard(newCard, deleteCard, likeCard, openImagePopup);
  list.prepend(cardElement);
  newCardForm.reset();
  closeModal(newCardModal);
}

// Назначаем обработчик для формы добавления карточки
newCardForm.addEventListener('submit', submitAddCardForm);

// Добавление начальных карточек
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard, likeCard, openImagePopup);
  list.append(cardElement);
});