const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const editProfileButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const closeEditPopupButton = editPopup.querySelector(".popup__close");

const profileNameInput = document.querySelector(".popup__input_type_name");
const profileDescriptionInput = document.querySelector(
  ".popup__input_type_description",
);

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const editProfileForm = editPopup.querySelector(".popup__form");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

editProfileButton.addEventListener("click", handleOpenEditModal);

closeEditPopupButton.addEventListener("click", function () {
  closeModal(editPopup);
});

function fillProfileForm() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(editPopup);
}

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

const container = document.querySelector(".cards");

const cardsContainer = container.querySelector(".cards__list");
const cardTemplate = cardsContainer
  .querySelector("#card-template")
  .content.querySelector(".card");

function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg",
) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = name;

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.setAttribute("src", link);
  cardImage.setAttribute("alt", name);
  const imagePopup = document.querySelector("#image-popup");
  const popupImage = imagePopup.querySelector(".popup__image");
  const popupCaption = imagePopup.querySelector(".popup__caption");
  const closeImagePopupButton = imagePopup.querySelector(".popup__close");
  function handleImageClick(name, link) {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;

    openModal(imagePopup);
  }
  cardImage.addEventListener("click", () => {
    handleImageClick(name, link);
  });

  closeImagePopupButton.addEventListener("click", () => {
    closeModal(imagePopup);
  });

  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like-button_is-active");
  });

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

function renderCard(name, link) {
  const cardEl = getCardElement(name, link);
  cardsContainer.prepend(cardEl);
}

initialCards.forEach((card) => {
  renderCard(card.name, card.link);
});

const addCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const closeAddCardButton = newCardPopup.querySelector(".popup__close");
const addCardForm = newCardPopup.querySelector(".popup__form");

const cardNameInput = addCardForm.querySelector(".popup__input_type_card-name");
const cardUrlInput = addCardForm.querySelector(".popup__input_type_url");

addCardButton.addEventListener("click", () => {
  openModal(newCardPopup);
});

closeAddCardButton.addEventListener("click", () => {
  closeModal(newCardPopup);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(cardNameInput.value, cardUrlInput.value);
  evt.target.reset();
  closeModal(newCardPopup);
}

addCardForm.addEventListener("submit", handleCardFormSubmit);
