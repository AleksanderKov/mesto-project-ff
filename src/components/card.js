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
  
  // Обработка лайка карточки
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => handleCardLike(item._id, likeButton, cardElement));
  
  // Обработка клика по изображению для открытия попапа с изображением
  cardImage.addEventListener('click', () => openImage(item.link, item.name));
  
  return cardElement;
}