// EDIT THESE SETTINGS to personalize the invitation.
const SETTINGS = {
  girlfriendName: "My Love Sondos",
  senderName: "Mohamed",
  recipientEmail: "tito.ateaf55@gmail.com",
  emailSubject: "My choices for our date night",
  invitationMessage:
    "I would love to make another beautiful memory with you. You choose the details, and I will take care of the rest."
};

const form = document.querySelector("#invitation-form");
const planner = document.querySelector("#date-form");
const summaryScreen = document.querySelector("#summary-screen");
const confirmationScreen = document.querySelector("#confirmation-screen");
const dateInput = document.querySelector("#date");
const timeInput = document.querySelector("#time");
const photo = document.querySelector("#couple-photo");

const selections = {
  food: "",
  film: ""
};

let emailUrl = "";

function applySettings() {
  document.querySelectorAll("[data-girlfriend-name]").forEach((element) => {
    element.textContent = SETTINGS.girlfriendName;
  });
  document.querySelectorAll("[data-sender-name]").forEach((element) => {
    element.textContent = SETTINGS.senderName;
  });
  document.querySelectorAll("[data-invitation-message]").forEach((element) => {
    element.textContent = SETTINGS.invitationMessage;
  });
  document.title = `A Date Invitation for ${SETTINGS.girlfriendName}`;
}

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function setupDateInput() {
  const today = getLocalDateString();
  dateInput.min = today;
  dateInput.addEventListener("change", () => {
    if (dateInput.value < today) {
      dateInput.value = "";
      showError("date-time-error", "Please choose today or a future date.");
    } else {
      showError("date-time-error", "");
    }
  });
}

function setupChoiceGroups() {
  document.querySelectorAll("[data-choice-group]").forEach((group) => {
    const type = group.dataset.choiceGroup;
    const cards = group.querySelectorAll(".choice-card");
    const customWrap = document.querySelector(`#${type}-custom-wrap`);
    const customInput = document.querySelector(`#${type}-custom`);

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        cards.forEach((item) => item.classList.remove("selected"));
        card.classList.add("selected");
        selections[type] = card.dataset.value;
        const isCustom = selections[type] === "custom";
        customWrap.hidden = !isCustom;
        showError(`${type}-error`, "");

        if (isCustom) {
          customInput.focus();
        } else {
          customInput.value = "";
        }
      });
    });
  });
}

function showError(id, message) {
  document.querySelector(`#${id}`).textContent = message;
}

function getChoice(type) {
  if (selections[type] !== "custom") {
    return selections[type];
  }
  return document.querySelector(`#${type}-custom`).value.trim();
}

function validateForm() {
  let isValid = true;
  const today = getLocalDateString();
  const food = getChoice("food");
  const film = getChoice("film");

  if (!dateInput.value || !timeInput.value) {
    showError("date-time-error", "Please choose both a date and a time.");
    isValid = false;
  } else if (dateInput.value < today) {
    showError("date-time-error", "Please choose today or a future date.");
    isValid = false;
  } else {
    showError("date-time-error", "");
  }

  if (!food) {
    showError("food-error", selections.food === "custom"
      ? "Please type the food you would like."
      : "Please choose something delicious.");
    isValid = false;
  } else {
    showError("food-error", "");
  }

  if (!film) {
    showError("film-error", selections.film === "custom"
      ? "Please type the film you would like."
      : "Please choose what we should watch.");
    isValid = false;
  } else {
    showError("film-error", "");
  }

  if (!isValid) {
    form.querySelector(".error-message:not(:empty)")?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }

  return isValid;
}

function formatDateAndTime() {
  const [year, month, day] = dateInput.value.split("-").map(Number);
  const [hours, minutes] = timeInput.value.split(":").map(Number);
  const selectedDate = new Date(year, month - 1, day, hours, minutes);
  return new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(selectedDate);
}

function buildEmailUrl() {
  const when = formatDateAndTime();
  const food = getChoice("food");
  const film = getChoice("film");
  const body = [
    `Hi ${SETTINGS.senderName}!`,
    "",
    "I picked our date night:",
    `Date and time: ${when}`,
    `Food: ${food}`,
    `Film: ${film}`,
    "",
    "I can't wait! ♥"
  ].join("\n");

  const subject = encodeURIComponent(SETTINGS.emailSubject);
  return `mailto:${SETTINGS.recipientEmail}?subject=${subject}&body=${encodeURIComponent(body)}`;
}

function showSummary() {
  document.querySelector("#summary-when").textContent = formatDateAndTime();
  document.querySelector("#summary-food").textContent = getChoice("food");
  document.querySelector("#summary-film").textContent = getChoice("film");
  emailUrl = buildEmailUrl();

  planner.hidden = true;
  summaryScreen.hidden = false;
  summaryScreen.scrollIntoView({ behavior: "smooth", block: "start" });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (validateForm()) {
    showSummary();
  }
});

document.querySelector("#edit-choices").addEventListener("click", () => {
  summaryScreen.hidden = true;
  planner.hidden = false;
  planner.scrollIntoView({ behavior: "smooth", block: "start" });
});

function openEmail() {
  window.location.href = emailUrl;
  window.setTimeout(() => {
    summaryScreen.hidden = true;
    confirmationScreen.hidden = false;
    confirmationScreen.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 500);
}

document.querySelector("#send-email").addEventListener("click", openEmail);
document.querySelector("#email-again").addEventListener("click", openEmail);

photo.addEventListener("error", () => {
  photo.classList.add("is-missing");
});

applySettings();
setupDateInput();
setupChoiceGroups();
