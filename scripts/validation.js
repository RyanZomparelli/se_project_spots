const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button-submit",
  inactiveButtonClass: "modal__button-submit_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};

const showInputError = (formEl, inputEl, errorMsg, config) => {
  const inputError = formEl.querySelector(`.${inputEl.id}-error`);
  inputError.textContent = errorMsg;
  inputError.classList.add(config.errorClass);
  inputEl.classList.add(config.inputErrorClass);
};

const hideInputError = (formEl, inputEl, config) => {
  const inputError = formEl.querySelector(`.${inputEl.id}-error`);
  inputError.textContent = "";
  inputError.classList.remove(config.errorClass);
  inputEl.classList.remove(config.inputErrorClass);
};

const checkInputValidity = (formEl, inputEl) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, settings);
  } else {
    hideInputError(formEl, inputEl, settings);
  }
};

const hasInvalidInput = (inputs) => {
  return inputs.some((input) => {
    return !input.validity.valid;
  });
};

const disableSubmitButton = (buttonEl, config) => {
  buttonEl.classList.add(config.inactiveButtonClass);
  buttonEl.disabled = true;
};

const toggleSubmitButton = (inputs, buttonEl, config) => {
  if (hasInvalidInput(inputs)) {
    disableSubmitButton(buttonEl, settings);
  } else {
    buttonEl.classList.remove(config.inactiveButtonClass);
    buttonEl.disabled = false;
  }
};

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const submitBtn = formEl.querySelector(config.submitButtonSelector);

  toggleSubmitButton(inputList, submitBtn, settings);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, settings);
      toggleSubmitButton(inputList, submitBtn, settings);
    });
  });
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, settings);
  });
};

enableValidation(settings);
