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
];

// Selects Edit profile modal and buttons
const editModalOpenBtn = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editModalCloseBtn = editProfileModal.querySelector(
  ".modal__button-close"
);

// Selects New post modal and buttons
const newPostModal = document.querySelector("#new-post-modal");
const newPostOpenBtn = document.querySelector(".profile__button-add");
const newPostClosebtn = newPostModal.querySelector(".modal__button-close");

// Selects profile text nodes and profile input values
const profileName = document.querySelector(".profile__name");
const nameInput = editProfileModal.querySelector("#name-input");
const profileDescription = document.querySelector(".profile__description");
const descriptionInput = editProfileModal.querySelector("#description-input");

// Selects new post inputs
const linkInput = newPostModal.querySelector("#image-input");
const captionInput = newPostModal.querySelector("#caption-input");

// Selects each form from it's respective modal
const editProfileForm = editProfileModal.querySelector(".modal__form");
const newPostForm = newPostModal.querySelector(".modal__form");

// New post modal open and close functions
function newPostOpen() {
  newPostModal.classList.add("modal_is-opened");
}
function newPostClose() {
  newPostModal.classList.remove("modal_is-opened");
}

// New post open and close event listeners
newPostOpenBtn.addEventListener("click", newPostOpen);
newPostClosebtn.addEventListener("click", newPostClose);

// New post submisson handler
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  console.log(linkInput.value);
  console.log(captionInput.value);
  newPostClose();
}

// New post submit listener
newPostForm.addEventListener("submit", handleAddCardSubmit);

// Sets default values when the edit modal form is opened.
// Included in the body of the editProfileOpen function for modal start up.
function fillEditProfileForm() {
  // Sets the text FROM the html elements as the default input values.
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

// Opens the edit profile modal with default values
// Passed to the eventListener method for the edit profile button as the handler
function editProfileOpen() {
  fillEditProfileForm();
  editProfileModal.classList.add("modal_is-opened");
}

// Closes the edit modal
// Passed to the eventListener wtih type 'click' for the editProfile modal close button as the handler
function editProfileClose() {
  // Removes a BEM modifier class assigneed to the modal container set to visibility: hidden;
  // to close the modal.
  editProfileModal.classList.remove("modal_is-opened");
}

// Handles form submission when user clicks the submit button
// Passed to the eventListener with type 'submit' for the submit button as the handler
function handleEditProfileFormSubmit(event) {
  // Prevents the page from refreshing when the submit button is clicked
  event.preventDefault();
  // Sets the new inputed values as the new text nodes in the DOM
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  editProfileClose();
}

// Waits for the click and opens or closes the modal using the above functions
editModalOpenBtn.addEventListener("click", editProfileOpen);
editModalCloseBtn.addEventListener("click", editProfileClose);

// Waits for the submit buton to be clicked and submits the form using the above function
editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);

// Clones the template element and all it's children from the html to an editable
//  and reusable dom object and stores it in a variable called cardElement then
// selects the children elements and injects them with data from properties of
// the objects inside the array initialCards.
// Called in the for loop below to create cards with the actual data from initialCards.
function getCardElement(data) {
  const cardElement = document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = data.name;
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  return cardElement;
}

// Selects and stores the <ul> element from the html to accept the newly created
// cards in the loop below.
const cardsList = document.querySelector(".cards__list");

// // Loops through each object of the array initialCards and creates a card using
// // the funtion getCardElement and the array data.
// for (let i = 0; i < initialCards.length; i++) {
//   // Creates a card and stores it in a card variable
//   const card = getCardElement(initialCards[i]);
//   // Adds the new card to the top of the cardsList.
//   cardsList.prepend(card);
// }
initialCards.forEach(function (item) {
  console.log(`This is the name: ${item.name}\nTHis is the link: ${item.link}`);
  const card = getCardElement(item);
  cardsList.prepend(card);
});
