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

const editModalOpenBtn = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#edit-modal");
const editModalCloseBtn = editModal.querySelector(".modal__button-close");

const profileName = document.querySelector(".profile__name");
const nameInput = editModal.querySelector("#name-input");
const profileDescription = document.querySelector(".profile__description");
const descriptionInput = editModal.querySelector("#description-input");

const editProfileForm = editModal.querySelector(".modal__form");

function editProfileOpen() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  editModal.classList.add("modal_opened");
}

function editProfileToggle() {
  editModal.classList.toggle("modal_opened");
}

function handleEditProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  editProfileToggle();
}

editModalOpenBtn.addEventListener("click", editProfileOpen);
editModalCloseBtn.addEventListener("click", editProfileToggle);

editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);
