import "./index.css";
import {
  enableValidation,
  resetValidation,
  disableSubmitButton,
  settings,
} from "../scripts/validation.js";

import API from "../utils/Api.js";

//VARIABLES

// Selects each form
const editProfileForm = document.forms["edit-profile"];
const newPostForm = document.forms["new-post"];
const cardDeleteForm = document.forms["delete-card"];
const newAvatarForm = document.forms["new-avatar"];

// Selects Edit profile modal and buttons
const editProfileModal = document.querySelector("#edit-profile-modal");
const editModalOpenBtn = document.querySelector(".profile__edit-button");
const editModalCloseBtn = editProfileModal.querySelector(
  ".modal__button-close"
);
const editProfileSubmitBtn = editProfileModal.querySelector(
  ".modal__button-submit"
);

//EditProfileForm inputs and elements
const nameInput = editProfileModal.querySelector("#name-input");
const descriptionInput = editProfileModal.querySelector("#description-input");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Selects New post modal and buttons
const newPostModal = document.querySelector("#new-post-modal");
const newPostOpenBtn = document.querySelector(".profile__button-add");
const newPostCloseBtn = newPostModal.querySelector(".modal__button-close");
const newPostSubmitBtn = newPostModal.querySelector(".modal__button-submit");

// Selects new post inputs
const linkInput = newPostModal.querySelector("#image-input");
const captionInput = newPostModal.querySelector("#caption-input");

// Selects Preview modal, buttons, and elements
const previewModal = document.querySelector("#preview-modal");
const previewCloseBtn = previewModal.querySelector(".modal__button-close");
const previewImage = previewModal.querySelector(".modal__img");
const previewCaption = previewModal.querySelector(".modal__caption");

//Selects edit avatar modal and buttons
const editAvatarModal = document.querySelector("#avatar-modal");
const editAvatarOpenBtn = document.querySelector(".profile__avatar-button");
const editAvatarCloseBtn = editAvatarModal.querySelector(
  ".modal__button-close"
);
const editAvatarSubmitBtn = editAvatarModal.querySelector(
  ".modal__button-submit"
);

//Selects avatar element and input
const profileAvatar = document.getElementById("profile-avatar");
const avatarInput = editAvatarModal.querySelector("#image-input");

//Selects delete modal and buttons
const deleteCardModal = document.querySelector("#delete-card-modal");
const deleteCardModalCloseBtn = deleteCardModal.querySelector(
  ".modal__button-close"
);
const cancelBtn = deleteCardModal.querySelector("#cancel");
const deleteSubmitBtn = deleteCardModal.querySelector(".modal__button-submit");

// Selects the <ul> element from the html to accept the newly created cards
const cardsList = document.querySelector(".cards__list");

//FUNCTIONS

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

// Sets default values when the edit modal form is opened.
function fillEditProfileForm() {
  // Uses the current DOM values as the default input values.
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

const handleCardLikes = (isLiked, cardLikeBtn) => {
  isLiked
    ? cardLikeBtn.classList.add("card__like-button_active")
    : cardLikeBtn.classList.remove("card__like-button_active");
};

function handleSubmitBtnUI(btn) {
  if (btn.disabled === true) {
    btn.textContent = "Save";
  } else {
    btn.textContent = "Saving";
  }
}

//Attatched to the trashcan btn upon card creation
function handleDeleteCard(cardELement, data) {
  selectedCard = cardELement;
  selectedCardId = data._id;
  deleteSubmitBtn.textContent = "Delete";
  openModal(deleteCardModal);
}

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

  //!!Set the inital visual state of the buttons upon loading or the UI won't save
  handleCardLikes(data.isLiked, cardLikeBtn);

  cardLikeBtn.addEventListener("click", () => {
    if (cardLikeBtn.classList.contains("card__like-button_active")) {
      api
        .removeLike(data._id)
        //Use the returned data to update the UI
        .then((updated) => {
          handleCardLikes(updated.isLiked, cardLikeBtn);
        })
        .catch((error) => console.error(error));
    } else {
      api
        .addLike(data._id)
        .then((updated) => {
          handleCardLikes(updated.isLiked, cardLikeBtn);
        })
        .catch((error) => console.error(error));
    }
  });

  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
  cardDeleteBtn.addEventListener("click", () => {
    handleDeleteCard(cardElement, data);
  });

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

//FORM SUBMISSION HANDLERS

function handleDeleteCardSubmit(selectedCard, selectedCardId) {
  api
    .removeCard(selectedCardId)
    .then(() => {
      deleteSubmitBtn.textContent = "Deleting";
      selectedCard.remove();
      closeModal(deleteCardModal);
    })
    .catch((error) => console.error(error));
}

function handleNewAvatarSubmit() {
  api
    .editAvatar(avatarInput.value)
    .then((data) => {
      handleSubmitBtnUI(editAvatarSubmitBtn);
      profileAvatar.src = data.avatar;
      closeModal(editAvatarModal);
      disableSubmitButton(editAvatarSubmitBtn, settings);
    })
    .catch((error) => console.error(error));
}

function handleEditProfileFormSubmit(e) {
  // Prevents the page from refreshing when the submit button is clicked
  e.preventDefault();
  const inputData = {
    name: nameInput.value,
    about: descriptionInput.value,
  };
  api
    .editUserInfo(inputData)
    .then((data) => {
      handleSubmitBtnUI(editProfileSubmitBtn);
      //If the promise resolves, the DOM updates with the new Values saved to the server
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(editProfileModal);
      disableSubmitButton(editProfileSubmitBtn, settings);
    })
    //Make a visible UX response later
    .catch((error) => console.error(error));
}

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
      handleSubmitBtnUI(newPostSubmitBtn);
      const card = getCardElement(data);
      cardsList.prepend(card);
      newPostForm.reset();
      closeModal(newPostModal);
      disableSubmitButton(newPostSubmitBtn, settings);
    })
    // figure out how to make an error message appear in the form
    .catch((error) => console.error(error));
}

//FLOW

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
      cardsList.append(card);
    });

    profileAvatar.src = userData.avatar;
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
  })
  .catch((error) => console.error(error));

enableValidation(settings);

// Open button listeners

editAvatarOpenBtn.addEventListener("click", (e) => {
  handleSubmitBtnUI(editAvatarSubmitBtn);
  openModal(editAvatarModal);
});

// Edit Profile open event listener
editModalOpenBtn.addEventListener("click", function () {
  handleSubmitBtnUI(editProfileSubmitBtn);
  openModal(editProfileModal);
  resetValidation(editProfileForm, [nameInput, descriptionInput], settings);
  fillEditProfileForm();
});

// New post open event listener
newPostOpenBtn.addEventListener("click", () => {
  handleSubmitBtnUI(newPostSubmitBtn);
  openModal(newPostModal);
});

//Close button listeners
editModalCloseBtn.addEventListener("click", () => closeModal(editProfileModal));
newPostCloseBtn.addEventListener("click", () => closeModal(newPostModal));
previewCloseBtn.addEventListener("click", () => closeModal(previewModal));
deleteCardModalCloseBtn.addEventListener("click", () =>
  closeModal(deleteCardModal)
);
cancelBtn.addEventListener("click", () => closeModal(deleteCardModal));
editAvatarCloseBtn.addEventListener("click", () => closeModal(editAvatarModal));

//handle click to close events
const modalList = document.querySelectorAll(".modal");
modalList.forEach((modal) => handleClickToClose(modal));

//Form Submission listeners

// New post submit listener
newPostForm.addEventListener("submit", handleAddCardSubmit);

// Edit Profile submit listener
editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);

//For deleting cards
//Remove card from the DOM
let selectedCard;
//Remove card from the server
let selectedCardId;

cardDeleteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handleDeleteCardSubmit(selectedCard, selectedCardId);
});

newAvatarForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handleNewAvatarSubmit();
});

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
