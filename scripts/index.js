const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

// Selects Edit profile modal and buttons
const editModalOpenBtn = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editModalCloseBtn = editProfileModal.querySelector(
  ".modal__button-close"
);
const editProfileSubmitBtn = editProfileModal.querySelector(
  ".modal__button-submit"
);

// Selects New post modal and buttons
const newPostModal = document.querySelector("#new-post-modal");
const newPostOpenBtn = document.querySelector(".profile__button-add");
const newPostCloseBtn = newPostModal.querySelector(".modal__button-close");
const newPostSubmitBtn = newPostModal.querySelector(".modal__button-submit");

// Selects profile text nodes and profile input values
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
  const card = getCardElement(inputData);
  cardsList.prepend(card);
  newPostForm.reset();
  closeModal(newPostModal);
  disableSubmitButton(newPostSubmitBtn, settings);
}

// New post submit listener
newPostForm.addEventListener("submit", handleAddCardSubmit);

// Sets default values when the edit modal form is opened.
function fillEditProfileForm() {
  // Uses the text FROM the html elements as the default input values.
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

// Edit Profile submission handler
function handleEditProfileFormSubmit(event) {
  // Prevents the page from refreshing when the submit button is clicked
  event.preventDefault();
  // Sets the new inputed values as the new text nodes in the DOM
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editProfileModal);
  disableSubmitButton(editProfileSubmitBtn);
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

// Selects the <ul> element from the html to accept the newly created cards
const cardsList = document.querySelector(".cards__list");

// Adds default cards to the dom
initialCards.forEach(function (item) {
  const card = getCardElement(item);
  cardsList.prepend(card);
});
