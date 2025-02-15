let currentModal = null;

export function openModal(modalElement) {
  if (!modalElement) return;
  currentModal = modalElement;
  modalElement.classList.add('popup_is-opened');
  document.addEventListener('keyup', handleEscClose);
}

export function closeModal(modalElement) {
  if (!modalElement) return;
  modalElement.classList.remove('popup_is-opened');
  if (currentModal === modalElement) {
    currentModal = null;
  }
  document.removeEventListener('keyup', handleEscClose);
}

function handleEscClose(event) {
  if (event.key === 'Escape' && currentModal) {
    closeModal(currentModal);
  }
}