export function createCard(item, currentUserId, handleCardDelete, handleCardLike, openImage, cardTemplate) {
  // Используем переданный шаблон вместо поиска внутри модуля
  const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
  
  // Сохраняем ID карточки
  cardElement.dataset.id = item._id;
  
  // Настраиваем изображение карточки
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  
  // Записываем заголовок карточки
  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = item.name;
  
  // Инициализация лайков: установка количества лайков и проверка лайка от текущего пользователя
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeQuantity = cardElement.querySelector('.card__like-quantity');
  likeQuantity.textContent = item.likes.length; // устанавливаем количество лайков
  if (item.likes.some(user => user._id === currentUserId)) {
    likeButton.classList.add('card__like-button_active');
  }
  
  // Обработка кнопки удаления
  const deleteButton = cardElement.querySelector('.card__delete-button');
  if (item.owner._id !== currentUserId) {
    // Если карточка не создана текущим пользователем, убираем кнопку удаления
    deleteButton.remove();
  } else {
    // Если карточка создана текущим пользователем, вешаем обработчик удаления
    deleteButton.addEventListener('click', () => {
      handleCardDelete(item._id, cardElement);
    });
  }
  
  // Обработка лайка карточки (обработчик уже подключён после инициализации состояния)
  likeButton.addEventListener('click', () => handleCardLike(item._id, likeButton, cardElement));
  
  // Обработка клика по изображению для открытия попапа с изображением
  cardImage.addEventListener('click', () => openImage(item.link, item.name));
  
  return cardElement;
}