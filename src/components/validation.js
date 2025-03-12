// Показ ошибки ввода
const displayInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);  
};

// Скрыть ошибку ввода
const removeInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

// Валидация поля ввода
const validateInputField = (formElement, inputElement, config) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    displayInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    removeInputError(formElement, inputElement, config);
  }
};

// Проверка ошибок валидации
const hasValidationErrors = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Отключить кнопку
export const deactivateSubmitButton = (buttonElement, config) => {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
};

// Включить кнопку
const activateSubmitButton = (buttonElement, config) => {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.disabled = false;
};

// Обновить состояние кнопки
const updateSubmitButtonState = (inputList, buttonElement, config) => {
  if (hasValidationErrors(inputList)) {
    deactivateSubmitButton(buttonElement, config);
  } else {
    activateSubmitButton(buttonElement, config);
  }
};

// Добавить слушатели формы
const attachFormListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      validateInputField(formElement, inputElement, config);
      updateSubmitButtonState(inputList, buttonElement, config);
    });
  });
};

// Инициализация валидации
export const initializeValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((formElement) => {
    attachFormListeners(formElement, config);
  });
};

// Сброс валидации
export const resetValidation = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) => {
    removeInputError(formElement, inputElement, config);
  });
  deactivateSubmitButton(buttonElement, config);
};
