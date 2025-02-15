export function createCard(item, deleteCard, likeCard, openImage) {
  const template = document.querySelector('#card-template').content;
  const cardElement = template.querySelector('.card').cloneNode(true);
  
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = item.link;
  cardImage.alt = item.name;

  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = item.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', likeCard);

  cardImage.addEventListener('click', function() {
      openImage(item.link, item.name);
  });

  return cardElement;
}

export function deleteCard(event) {
  event.target.closest('.card').remove();
}

export function likeCard(event) {
  const likeButton = event.target;
  likeButton.classList.toggle('card__like-button_active');
}
