//Функция для отображения карточек на странице
function renderCards(cards) {
    //Получаем содержимое шаблона
    const template = document.querySelector('#card-template').content;
    //Находим список, куда будут добавлены карточки
    const list = document.querySelector('.places__list');

    //Используя метод массива forEach, проходим по массиву карточек
    cards.forEach(card => {
        //Клонируем содержимое шаблона
        const cardElement = template.cloneNode(true);
        //Устанавливаем ссылку на изображение карточки
        const cardImage = cardElement.querySelector('.card__image');
        //Устанавливаем значение атрибута src
        cardImage.src = card.link;
        //Устанавливаем значение alt не хорошо оставлять его пустым используем название(name) города
        cardImage.alt = card.name;

        //Устанавливаем название города
        const cardTitle = cardElement.querySelector('.card__title');
        //Устанавливаем текстовое содержимое
        cardTitle.textContent = card.name;

        //Добавляем заполненную карточку в список
        list.appendChild(cardElement);
    });   
}

//Вызываем функцию отображения карточек - параметром укажем массив объектов
renderCards(initialCards);

//Функция удаление карточек  
//Добавляет обработчик события DOMContentLoaded к документу. Сработает когда HTML-документ будет полностью загружен и разобран.
document.addEventListener('DOMContentLoaded', () => {
    //Получаем все кнопки удаления карточек
    const deleteButtons = document.querySelectorAll('.card__delete-button');
    //Добавляем обработчик событий на каждую кнопку
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            //Находим родительский элемент карточки
            const card = this.closest('.card');
            //Проверяем есть ли элемент и удаляем его
            if (card) {
                card.remove();
            }
        });
    });
});