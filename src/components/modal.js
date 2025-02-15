export function openModal(modalElement) {
  if (!modalElement) return;
  modalElement.classList.add('popup_is-opened');
  document.addEventListener('keyup', handleEscClose);
}

export function closeModal(modalElement) {
  if (!modalElement) return;
  modalElement.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', handleEscClose);
}

export function closeByOverlay(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.currentTarget);
  }
}

function handleEscClose(event) {
  if (event.key === 'Escape') {
    const openedModal = document.querySelector('.popup_is-opened');
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}