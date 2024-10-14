// Функция создаёт элемент карточки
function createCard(item, deleteCard) {
    const template = document.querySelector('#card-template').content;
    const cardElement = template.cloneNode(true);
    
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = item.link;
    cardImage.alt = item.name;

    const cardTitle = cardElement.querySelector('.card__title');
    cardTitle.textContent = item.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    //обработчик события для удаления карточки
    deleteButton.addEventListener('click', deleteCard);
    return cardElement;
}

// Функция удаления карточек
function deleteCard(event) {
    event.target.closest('.card').remove();
}

// Массив карточек добавляем в список
const list = document.querySelector('.places__list');
initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard);
    list.append(cardElement);
});