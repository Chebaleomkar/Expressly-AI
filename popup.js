// Moods Array
const moodArray = [
  "Love ❤️",
  "Happy 😄",
  "Sad 😢",
  "Angry 😠",
  "Excited 🤩",
  "Confused 😕",
  "Sarcastic 😏",
  "Professional 💼",
  "Casual 😎",
];

// DOM Elements
const moodsList = document.querySelector(".moods-list");
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");
const themeRadios = document.querySelectorAll('input[name="theme"]');
const acceptButton = document.getElementById("accept-button");
const discardButton = document.getElementById("discard-button");
const regenerateButton = document.getElementById("regenerate-button");

// Populate Moods
moodArray.forEach((mood) => {
  const button = document.createElement("button");
  button.textContent = mood;
  button.addEventListener("click", () => {
    console.log("Selected Mood:", mood);
    // TODO: Send mood to API
  });
  moodsList.appendChild(button);
});

// Tab Switching
tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const tabId = button.getAttribute("data-tab");
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));
    button.classList.add("active");
    document.getElementById(tabId).classList.add("active");
  });
});

// Theme Switching
themeRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    document.body.className = radio.value === "dark" ? "dark" : "";
  });
});

// Popup Actions
acceptButton.addEventListener("click", () => {
  console.log("Message Accepted");
  // TODO: Replace input box message
});

discardButton.addEventListener("click", () => {
  console.log("Message Discarded");
  window.close(); // Close the popup
});

regenerateButton.addEventListener("click", () => {
  console.log("Regenerating Message");
  // TODO: Regenerate message via API
});