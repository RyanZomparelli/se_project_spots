import "./index.css";
import {
  enableValidation,
  resetValidation,
  disableSubmitButton,
  settings,
} from "../scripts/validation.js";

import API from "../scripts/Api.js";

const api = new API({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "640264a7-d833-4076-a643-c71cc77da761",
    "content-type": "application/json",
  },
});

//Make GET requests to retrieve data upon page load
api
  .getAppData()
  .then((data) => {
    //data is an array with two elements that comes froms a Promise.all call that
    // loads the initial data from the server. The first element is an array of cards
    //and the second element is the userInfo.
    const [cardData, userData] = data;

    cardData.forEach((item) => {
      const card = getCardElement(item);
      cardsList.prepend(card);
    });

    profileAvatar.src = userData.avatar;
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
  })
  .catch((error) => console.error(error));

// Selects Edit profile modal and buttons
const editModalOpenBtn = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editModalCloseBtn = editProfileModal.querySelector(
  ".modal__button-close"
);
const editProfileSubmitBtn = editProfileModal.querySelector(
  ".modal__button-submit"
);

// Selects the <ul> element from the html to accept the newly created cards
const cardsList = document.querySelector(".cards__list");

// Selects New post modal and buttons
const newPostModal = document.querySelector("#new-post-modal");
const newPostOpenBtn = document.querySelector(".profile__button-add");
const newPostCloseBtn = newPostModal.querySelector(".modal__button-close");
const newPostSubmitBtn = newPostModal.querySelector(".modal__button-submit");

// Selects profile text nodes and profile input values
const profileAvatar = document.getElementById("profile-avatar");
const profileName = document.querySelector(".profile__name");
const nameInput = editProfileModal.querySelector("#name-input");
const profileDescription = document.querySelector(".profile__description");
const descriptionInput = editProfileModal.querySelector("#description-input");

// Selects new post inputs
const linkInput = newPostModal.querySelector("#image-input");
const captionInput = newPostModal.querySelector("#caption-input");

// Selects each form
const editProfileForm = document.forms["edit-profile"];
const newPostForm = document.forms["new-post"];

// Selects Preview modal elements
const previewModal = document.querySelector("#preview-modal");
const previewCloseBtn = previewModal.querySelector(".modal__button-close");
const previewImage = previewModal.querySelector(".modal__img");
const previewCaption = previewModal.querySelector(".modal__caption");

enableValidation(settings);

// General purpose open and close modal logic w/ Escape key close
function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleKeyDown);
}
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  //Removed keydown event listener for performance reasons
  document.removeEventListener("keydown", handleKeyDown);
}
// click to close logic
const handleClickToClose = (modal) => {
  modal.addEventListener("click", (e) => {
    if (!e.target.closest(".modal__container")) {
      closeModal(modal);
    }
  });
};
//Handle keydown event Escape close
function handleKeyDown(e) {
  modalList.forEach((modal) => {
    if (e.key === "Escape") {
      closeModal(modal);
    }
  });
}
//handle click to close events
const modalList = document.querySelectorAll(".modal");
modalList.forEach((modal) => handleClickToClose(modal));

// New post open and close event listeners
newPostOpenBtn.addEventListener("click", () => openModal(newPostModal));
newPostCloseBtn.addEventListener("click", () => closeModal(newPostModal));

// New post submisson handler
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const inputData = {
    name: captionInput.value,
    link: linkInput.value,
  };
  api
    .addNewCard(inputData)
    .then((data) => {
      const card = getCardElement(data);
      cardsList.prepend(card);
      newPostForm.reset();
      closeModal(newPostModal);
      disableSubmitButton(newPostSubmitBtn, settings);
    })
    // figure out how to make an error message appear in the form
    .catch((error) => console.error(error));
}

// New post submit listener
newPostForm.addEventListener("submit", handleAddCardSubmit);

// Sets default values when the edit modal form is opened.
function fillEditProfileForm() {
  // Uses the current DOM values as the default input values.
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

// Edit Profile submission handler
function handleEditProfileFormSubmit(event) {
  // Prevents the page from refreshing when the submit button is clicked
  event.preventDefault();
  const inputData = {
    name: nameInput.value,
    about: descriptionInput.value,
  };
  api
    .editUserInfo(inputData)
    .then((data) => {
      //If the promise resolves, the DOM updates with the new Values saved to the server
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(editProfileModal);
      disableSubmitButton(editProfileSubmitBtn, settings);
    })
    //Make a visible UX response later
    .catch((error) => console.error(error));
}

// Edit Profile open/close event listeners
editModalOpenBtn.addEventListener("click", function () {
  openModal(editProfileModal);
  resetValidation(editProfileForm, [nameInput, descriptionInput], settings);
  fillEditProfileForm();
});

editModalCloseBtn.addEventListener("click", () => closeModal(editProfileModal));
previewCloseBtn.addEventListener("click", () => closeModal(previewModal));

// Edit Profile submit listener
editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);

// Creates cards
function getCardElement(data) {
  // Clones the template element and all it's children from the html to an editable
  //  and reusable dom object and stores it in a variable called cardElement then
  // selects the children elements and injects them with data from properties of
  // the objects inside the array initialCards.
  const cardElement = document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = data.name;
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;

  // Makes sure every card thats created has like button and delete button functionality
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  cardLikeBtn.addEventListener("click", () =>
    cardLikeBtn.classList.toggle("card__like-button_active")
  );

  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
  cardDeleteBtn.addEventListener("click", () => cardElement.remove());

  cardElement.addEventListener("click", function (evt) {
    if (evt.target === cardImage) {
      openModal(previewModal);
      previewImage.src = data.link;
      previewImage.alt = data.name;
      previewCaption.textContent = data.name;
    }
  });

  return cardElement;
}
// End of getCardElement function

export {
  editModalOpenBtn,
  editProfileModal,
  editModalCloseBtn,
  editProfileSubmitBtn,
  newPostModal,
  newPostOpenBtn,
  newPostCloseBtn,
  newPostSubmitBtn,
  profileName,
  descriptionInput,
  nameInput,
  linkInput,
  captionInput,
  editProfileForm,
  newPostForm,
  previewModal,
  previewCloseBtn,
  previewCaption,
  previewImage,
  openModal,
  closeModal,
  handleClickToClose,
  handleKeyDown,
  modalList,
  handleAddCardSubmit,
  fillEditProfileForm,
  handleEditProfileFormSubmit,
  getCardElement,
  cardsList,
};
