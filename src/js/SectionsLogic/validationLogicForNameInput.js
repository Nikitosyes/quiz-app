import { quizContainer } from "../main";
import { renderMainPage } from "../renderSection/renderMainPage";
import { renderNewFinishedQuiz } from "../renderSection/renderNewFinishedQuiz";
import { clearHtmlForItem } from "../utilities/clearHtmlForItem";

export class ShowErrorNameInput {
  constructor(errorContainer, errorMessage) {
    this.errorContainer = errorContainer;
    this.errorMessage = errorMessage;
  }

  displayError() {
    this.removeError();
    this.errorContainer.innerHTML = this.errorMessage;
  }

  removeError() {
    this.errorContainer.innerHTML = "";
  }
}

export class RequiredValidator extends ShowErrorNameInput {
  constructor(input, errorContainer) {
    super(errorContainer, "Provide your Name");
    this.value = input instanceof HTMLElement ? input.value : input;
  }
  validate() {
    return this.value.trim() !== "";
  }
}

export class MinMaxLengthValidator extends ShowErrorNameInput {
  constructor(min, max, input, errorContainer) {
    super(
      errorContainer,
      "Your Name should be at least 2 characters, but no more than 20"
    );
    this.input = input;
    this.min = min;
    this.max = max;
  }
  validate() {
    const value = this.input.value.trim();
    const length = value.length;
    return length <= this.max && length >= this.min;
  }
}

export class LetterValidator extends ShowErrorNameInput {
  constructor(input, errorContainer) {
    super(errorContainer, "Your Name must have at least one letter");
    this.value = input instanceof HTMLElement ? input.value : input;
  }
  validate() {
    return /\p{L}/u.test(this.value);
  }
}

export class FieldValidator {
  constructor(...validators) {
    this.validators = validators;
    this.successCallback = null;
  }

  setSuccessCallback(callback) {
    this.successCallback = callback;
  }

  validateInput() {
    let isValid = true;
    for (const validator of this.validators) {
      if (!validator.validate()) {
        validator.displayError();
        isValid = false;
        break;
      } else {
        validator.removeError();
      }
    }

    if (isValid && this.successCallback) {
      this.successCallback();
    }
    return isValid;
  }
}

export function setUpNameInputValidationLogic(questions) {
  const formInputName = document.querySelector(".form");

  formInputName.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = formInputName.querySelector("input");
    const errorContainer = formInputName.querySelector(".error_for-input");

    const fieldInputName = new FieldValidator(
      new RequiredValidator(nameInput, errorContainer),
      new MinMaxLengthValidator(2, 20, nameInput, errorContainer),
      new LetterValidator(nameInput, errorContainer)
    );

    let playerName = nameInput.value;

    fieldInputName.setSuccessCallback(() => {
      clearHtmlForItem(quizContainer);
      renderNewFinishedQuiz(playerName, questions);
    });

    fieldInputName.validateInput();
  });
}
