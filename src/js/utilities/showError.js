import { clearHtmlForItem } from "./clearHtmlForItem";

export function showError(errorContainer, message) {
  clearHtmlForItem(errorContainer);
  const existingErrorMessageElement = document.querySelector(".error-message");
  if (existingErrorMessageElement) {
    existingErrorMessageElement.remove();
  }

  const errorMessageElement = document.createElement("div");
  errorMessageElement.classList.add("error-message");
  errorMessageElement.innerHTML = `${message}`;
  errorContainer.prepend(errorMessageElement);
}

export function removePossibleExistingError() {
  const existingErrorMessageElement = document.querySelector(".error-message");
  if (existingErrorMessageElement) {
    existingErrorMessageElement.remove();
  }
}
