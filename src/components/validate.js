function showInputError(formElement, inputElement, message, validationSettings) {
    const errorSpan = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.add(validationSettings.inputErrorClass);
    errorSpan.textContent = message;
    errorSpan.classList.add(validationSettings.errorClass);

    const errorHeight = errorSpan.scrollHeight;
    if (errorHeight > 44) {
        errorSpan.style.position = 'relative';
    }
}

function hideInputError(formElement, inputElement, validationSettings) {
    const errorSpan = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorSpan.textContent = '';
    errorSpan.classList.remove(validationSettings.errorClass);
}

function resetFormErrors(formElement, buttonElement, validationSettings) {
    if (!formElement || !buttonElement || !validationSettings) {
        return;
    }

    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, validationSettings);
    });

    buttonElement.classList.add(validationSettings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
}

function checkInputValidity(formElement, inputElement, validationSettings) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
    } else {
        hideInputError(formElement, inputElement, validationSettings);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement => {
        return !inputElement.validity.valid;
    }))
}

function toggleButtonState (inputList, buttonElement, validationSettings) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(validationSettings.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(validationSettings.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

function setEventListeners (formElement, validationSettings) {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationSettings);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, validationSettings);
        toggleButtonState(inputList, buttonElement, validationSettings);
      });
    });
};

function enableValidation (validationSettings) {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
        setEventListeners(formElement, validationSettings);
    });
};

export {resetFormErrors, enableValidation}