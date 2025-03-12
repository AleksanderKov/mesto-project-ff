import './index.css';
import { createCard } from './components/card.js';
import { openModal, closeModal, closeByOverlay } from './components/modal.js';
import { initializeValidation, resetValidation } from './components/validation.js';
import { 
  loadInitialData, 
  editProfile, 
  addNewCard, 
  deleteCardOnServer, 
  addLike, 
  removeLike, 
  editAvatar 
} from './components/api.js';

// Глобальные переменные
let currentUserId;

// Получение DOM-элементов

// Элементы профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Редактирование профиля
const editModalElement = document.querySelector('.popup_type_edit');
const openEditButton = document.querySelector('.profile__edit-button');
const closeEditButton = editModalElement.querySelector('.popup__close');
const profileForm = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');

// Попап с изображением
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

// Контейнер карточек и шаблон
const list = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template');

// Добавление новой карточки
const newCardModal = document.querySelector('.popup_type_new-card');
const openNewCardButton = document.querySelector('.profile__add-button');
const closeNewCardButton = newCardModal ? newCardModal.querySelector('.popup__close') : null;
const newCardForm = document.querySelector('.popup__form[name="new-place"]');

// Обновление аватара
const avatarModal = document.querySelector('.popup_type_replace_avatar');
const avatarForm = avatarModal.querySelector('.popup__form');
const avatarInput = avatarModal.querySelector('#replace-avatar-link-input');
const avatarSubmitButton = avatarModal.querySelector('.popup__button');
const profileAvatar = document.querySelector('.profile__image');

// Настройки валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'form__input-error_active'
};

initializeValidation(validationConfig);

// События для модальных окон

// Открыть попап добавления карточки
openNewCardButton.addEventListener('click', () => {
  resetValidation(newCardForm, validationConfig);
  openModal(newCardModal);
});
if (closeNewCardButton) {
  closeNewCardButton.addEventListener('click', () => closeModal(newCardModal));
}

// Закрытие по клику на оверлей
if (editModalElement) { editModalElement.addEventListener('click', closeByOverlay); }
if (imagePopup) { imagePopup.addEventListener('click', closeByOverlay); }
newCardModal.addEventListener('click', closeByOverlay);

// Открыть попап редактирования профиля
openEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  resetValidation(profileForm, validationConfig);
  nameInput.dispatchEvent(new Event('input'));
  jobInput.dispatchEvent(new Event('input'));
  openModal(editModalElement);
});
closeEditButton.addEventListener('click', () => closeModal(editModalElement));

// Функции для профиля

// Отправка формы редактирования профиля
function submitEditProfile(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  const submitButton = evt.currentTarget.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...'; // индикация загрузки
  editProfile({ name: nameValue, about: jobValue })
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(editModalElement);
    })
    .catch(err => console.log(err))
    .finally(() => { submitButton.textContent = 'Сохранить'; });
}
profileForm.addEventListener('submit', submitEditProfile);

// Функции для карточек

// Обработка лайка карточки
function handleCardLike(cardId, likeButton, cardElement) {
  if (likeButton.classList.contains('card__like-button_active')) {
    removeLike(cardId)
      .then((updatedCard) => {
        likeButton.classList.remove('card__like-button_active');
        cardElement.querySelector('.card__like-quantity').textContent = updatedCard.likes.length;
      })
      .catch(err => console.log(err));
  } else {
    addLike(cardId)
      .then((updatedCard) => {
        likeButton.classList.add('card__like-button_active');
        cardElement.querySelector('.card__like-quantity').textContent = updatedCard.likes.length;
      })
      .catch(err => console.log(err));
  }
}

// Открыть попап с изображением
function openImagePopup(imageSrc, imageAlt) {
  if (imagePopup) {
    popupImage.src = imageSrc;
    popupImage.alt = imageAlt;
    popupCaption.textContent = imageAlt;
    openModal(imagePopup);
  }
}
const closeImageButton = imagePopup.querySelector('.popup__close');
if (closeImageButton) {
  closeImageButton.addEventListener('click', () => closeModal(imagePopup));
}

// Отправка формы добавления карточки
function submitAddCardForm(event) {
  event.preventDefault();
  const submitButton = event.currentTarget.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';
  const placeName = newCardForm.querySelector('input[name="place-name"]').value;
  const link = newCardForm.querySelector('input[name="link"]').value;
  addNewCard({ name: placeName, link: link })
    .then((newCardData) => {
      const cardElement = createCard(newCardData, currentUserId, handleCardDelete, handleCardLike, openImagePopup, cardTemplate);
      list.prepend(cardElement);
      newCardForm.reset();
      closeModal(newCardModal);
    })
    .catch(err => console.log(err))
    .finally(() => { submitButton.textContent = 'Создать'; });
}
newCardForm.addEventListener('submit', submitAddCardForm);

// Загрузка данных с сервера
loadInitialData()
  .then(([userData, cards]) => {
    currentUserId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    cards.forEach((cardData) => {
      const cardElement = createCard(cardData, currentUserId, handleCardDelete, handleCardLike, openImagePopup, cardTemplate);
      list.append(cardElement);
    });
  })
  .catch(err => console.log(err));

// Удаление карточки с подтверждением
function handleCardDelete(cardId, cardElement) {
  openConfirmPopup(() => {
    deleteCardOnServer(cardId)
      .then(() => { cardElement.remove(); })
      .catch(err => console.error('Ошибка удаления карточки:', err));
  });
}

// Специфичный confirm popup
function openConfirmPopup(confirmCallback) {
  let confirmPopup = document.querySelector('.popup_type_confirm');
  if (!confirmPopup) {
    const template = document.querySelector('#confirm-popup-template');
    if (!template) {
      console.error('Не найден шаблон confirm popup');
      return;
    }
    confirmPopup = document.importNode(template.content, true).firstElementChild;
    document.body.append(confirmPopup);
    confirmPopup.addEventListener('click', closeByOverlay);
  }
  const confirmButton = confirmPopup.querySelector('.popup__confirm-button');
  if (!confirmButton) {
    console.error('Не найдена кнопка подтверждения');
    return;
  }
  const closeButton = confirmPopup.querySelector('.popup__close');
  if (closeButton) {
    closeButton.addEventListener('click', () => closeModal(confirmPopup));
  }
  openModal(confirmPopup);
  function handleConfirm() {
    confirmCallback();
    closeModal(confirmPopup);
    confirmButton.removeEventListener('click', handleConfirm);
  }
  confirmButton.addEventListener('click', handleConfirm);
}

// Для обновления аватара

// Управление состоянием кнопки ввода аватара
avatarSubmitButton.classList.add(validationConfig.inactiveButtonClass);
avatarSubmitButton.disabled = true;
avatarInput.addEventListener('input', () => {
  if (avatarInput.validity.valid) {
    avatarSubmitButton.classList.remove(validationConfig.inactiveButtonClass);
    avatarSubmitButton.disabled = false;
  } else {
    avatarSubmitButton.classList.add(validationConfig.inactiveButtonClass);
    avatarSubmitButton.disabled = true;
  }
});

// Отправка формы обновления аватара
function handleAvatarUpdate(evt) {
  evt.preventDefault();
  avatarSubmitButton.textContent = 'Сохранение...';
  const avatarUrl = avatarInput.value;
  editAvatar(avatarUrl)
    .then((result) => {
      profileAvatar.style.backgroundImage = `url(${result.avatar})`;
      closeModal(avatarModal);
    })
    .catch((err) => { console.error('Ошибка обновления аватара:', err); })
    .finally(() => { avatarSubmitButton.textContent = 'Сохранить'; });
}
avatarForm.addEventListener('submit', handleAvatarUpdate);

// Открыть окно обновления аватара
function openAvatarModal() {
  openModal(avatarModal);
  avatarModal.addEventListener('click', closeByOverlay);
  const avatarModalCloseButton = avatarModal.querySelector('.popup__close');
  avatarModalCloseButton.addEventListener('click', () => closeModal(avatarModal));
}
const avatarReplaceButton = document.querySelector('.profile__image-replace-avatar');
avatarReplaceButton.addEventListener('click', openAvatarModal);