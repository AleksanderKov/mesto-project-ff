const config = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-magistr-2',
    headers: {
      authorization: '9a6cdb2f-ce41-4fb5-a4e0-a1a046855996',
      'Content-Type': 'application/json'
    }
  };
  
// Проверка запроса
const checkResponse = (data) => {
    return data.ok ? data.json() : Promise.reject(`Ошибка: ${data.status}`);
  };

// Запрашивает информацию о пользователе
const fetchUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
    .then(checkResponse);
  };

// Запрашиваем начальные карточки
const fetchInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(checkResponse);
  };

// Загружает одновременно карточки и данные пользователя, возвращая промис с массивом [cards, user]
export const loadInitialData = () => Promise.all([fetchUserInfo(), fetchInitialCards()]);

// Обновляем информацию о пользователе на сервере
export const editProfile = (profileData) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: profileData.name,
        about: profileData.about
      })
    })
    .then(checkResponse);
  };

// Отправляем на сервер данные для создания новой карточки и возвращаем ответ с созданной карточкой
export const addNewCard = (cardData) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
    .then(checkResponse);
  };

//Обновление аватара пользователя
export const editAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
  .then(checkResponse);
};

// Удаление карточки
export const deleteCardOnServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then(checkResponse);
  };

// Добавляем карточке лайк
export const addLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers
    })
    .then(checkResponse);
  };

// Удаляем лайк у карточки
export const removeLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then(checkResponse);
  };