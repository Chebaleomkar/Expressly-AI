const moodArray = [
  "Love ❤️", "Happy 😄", "Sad 😢", "Angry 😠", "Excited 🤩", "Confused 😕", "Sarcastic 😏", 
  "Professional 💼", "Casual 😎", "Grateful 🙏", "Motivational 💪", "Relaxed 🧘", "Romantic 💖", 
  "Cheerful 😊", "Nostalgic 🕰️", "Friendly 🤗", "Optimistic 🌟", "Funny 😂", "Encouraging 🤝", 
  "Apologetic 🙇", "Supportive 💕", "Mysterious 🕵️", "Playful 🥳", "Worried 😟", "Serious 🤔", 
  "Energetic ⚡", "Bored 😐", "Empathetic 🤲", "Adventurous 🧗", "Proud 🦁", "Hopeful 🌈", 
  "Surprised 😲", "Determined 🎯", "Shy 🙈", "Focused 🧐", "Blessed ✨", "Tired 💤", "Curious 🦉", 
  "Warm ❤️‍🔥", "Caring 🤗", "Peaceful ✌️"
];

let selectedMoods = [];

// Utility function to handle mood selection
function handleMoodSelection(moodButton, mood) {
  if (selectedMoods.includes(mood)) {
    selectedMoods = selectedMoods.filter((m) => m !== mood);
    moodButton.style.backgroundColor = "#666"; // Deselect mood
  } else {
    selectedMoods.push(mood);
    moodButton.style.backgroundColor = "#007bff"; // Select mood
  }
  console.log("Selected Moods:", selectedMoods);
}

// Utility function to create the tooltip
function createTooltip() {
  const tooltip = document.createElement("div");
  tooltip.id = "ai-tooltip";
  tooltip.className = "ai-tooltip dark"; // Default dark theme
  tooltip.innerHTML = `
    <div class="tooltip-tabs">
      <button class="tooltip-tab-button active" data-tab="moods">Moods</button>
      <button class="tooltip-tab-button" data-tab="prompt">Prompt</button>
      <button class="tooltip-tab-button" data-tab="settings">Settings</button>
    </div>
    <div id="moods" class="tooltip-tab-content active">
      <div class="moods-list">
        ${moodArray.map((mood) => `<button>${mood}</button>`).join("")}
      </div>
    </div>
    <div id="prompt" class="tooltip-tab-content">
      <textarea id="prompt-input" placeholder="Specify how you want the message to sound..."></textarea>
    </div>
    <div id="settings" class="tooltip-tab-content">
      <h2>Theme Settings</h2>
      <label><input type="radio" name="theme" value="light"> Light Theme</label>
      <label><input type="radio" name="theme" value="dark" checked> Dark Theme</label>
    </div>
    <div id="aioptions"  class="tooltip-actions">
      <input type="text" id="input-box" placeholder="Enter text here" />
      <div class="button-group">
        <button id="generate-button">Generate</button>
        <button class="text-sm font-bold" id="accept-button" style="display: none;">Accept</button>
        <button id="discard-button" style="display: none;">Discard</button>
        <button id="regenerate-button" style="display: none;">Regenerate</button>
      </div>
    </div>
  `;
  return tooltip;
}

// Utility function to handle API calls
async function callEnhancementAPI(prompt, moods, originalMessage) {
  try {
    const response = await fetch("http://localhost:3000/api/express-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, moods, originalMessage }),
    });

    if (!response.ok) throw new Error("Failed to fetch enhanced message");
    const data = await response.json();
    return data.generatedMessage;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("An error occurred while generating the enhanced message.");
  }
}

// Function to handle Generate button click
function handleGenerateButtonClick(tooltip) {
  const generateButton = tooltip.querySelector("#generate-button");
  const acceptButton = tooltip.querySelector("#accept-button");
  const discardButton = tooltip.querySelector("#discard-button");
  const regenerateButton = tooltip.querySelector("#regenerate-button");
  const promptTextarea = tooltip.querySelector("#prompt-input");
  const inputBox = tooltip.querySelector('#input-box')

  generateButton.addEventListener("click", async () => {
    // Extract the message from the WhatsApp input box
    const whatsappInput = document.querySelector("div[contenteditable='true'][data-tab='10']");
    const originalMessage = whatsappInput?.innerText.trim();

    if (!originalMessage) {
      alert("Please type a message in the WhatsApp input box.");
      return;
    }

    const prompt = promptTextarea?.value || "";
    const moods = Array.from(tooltip.querySelectorAll(".moods-list button[style*='background-color: rgb(0, 123, 255)']"))
      .map((button) => button.textContent);

    try {
      const enhancedMessage = await callEnhancementAPI(prompt, moods, originalMessage);
      if (inputBox) inputBox.value = enhancedMessage;

      generateButton.style.display = "none";
      acceptButton.style.display = "inline-block";
      discardButton.style.display = "inline-block";
      regenerateButton.style.display = "inline-block";
    } catch (error) {
      alert(error.message);
    }
  });
}

// Function to handle Regenerate button click
function handleRegenerateButtonClick(tooltip) {
  const regenerateButton = tooltip.querySelector("#regenerate-button");
  regenerateButton.addEventListener("click", () => {
    tooltip.querySelector("#generate-button").click();
  });
}

function handleAcceptButtonClick(tooltip) {
  const acceptButton = tooltip.querySelector("#accept-button");
  const inputBox = tooltip.querySelector("#input-box");

  acceptButton.addEventListener("click", () => {
    // Get the WhatsApp input box
    const whatsappInput = document.querySelector("div[contenteditable='true'][data-tab='10']");

    if (whatsappInput && inputBox) {
      // Focus on the WhatsApp input box
      whatsappInput.focus();

      // Use execCommand to insert the enhanced message
      const enhancedMessage = inputBox.value;
      document.execCommand("insertText", false, enhancedMessage);

      console.log("Enhanced message inserted into WhatsApp input box.");
    }

    // Close the tooltip
    tooltip.remove();
  });
}

// Function to handle Discard button click
function handleDiscardButtonClick(tooltip) {
  const discardButton = tooltip.querySelector("#discard-button");
  discardButton.addEventListener("click", () => {
    console.log("Message Discarded");
    tooltip.remove();
  });
}

// Function to set up tooltip functionality
function setupTooltipFunctionality(tooltip) {
  const tabButtons = tooltip.querySelectorAll(".tooltip-tab-button");
  const tabContents = tooltip.querySelectorAll(".tooltip-tab-content");
  const themeRadios = tooltip.querySelectorAll('input[name="theme"]');

  // Tab Switching
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-tab");
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));
      button.classList.add("active");
      tooltip.querySelector(`#${tabId}`).classList.add("active");
    });
  });

  // Theme Switching
  themeRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      tooltip.className = `ai-tooltip ${radio.value}`;
    });
  });

  // Mood Selection
  tooltip.querySelectorAll(".moods-list button").forEach((button) => {
    button.addEventListener("click", () => handleMoodSelection(button, button.textContent));
  });

  // Button Handlers
  handleGenerateButtonClick(tooltip);
  handleRegenerateButtonClick(tooltip);
  handleAcceptButtonClick(tooltip);
  handleDiscardButtonClick(tooltip);
}

// Function to show the tooltip
function showTooltip(aiIcon) {
  const tooltip = createTooltip();
  document.body.appendChild(tooltip);

  // Position the tooltip
  const iconRect = aiIcon.getBoundingClientRect();
  tooltip.style.position = "absolute";
  tooltip.style.bottom = `10%`;
  tooltip.style.right = `1.5rem`;

  // Set up tooltip functionality
  setupTooltipFunctionality(tooltip);
}

function addAIIcon() {
  const inputContainer = document.querySelector("div._ak1r");
  if (inputContainer && !inputContainer.querySelector("div[aria-label='AI Enhancer']")) {
    const aiIcon = document.createElement("div");
    aiIcon.innerHTML = `
      <div class='center'>
        <div id='box' class='ai-icon'>
        <img style="height: 31px; border-radius: 50%;" src="https://omkarchebale.vercel.app/ai.png" alt="Ai icon"  />
        </div>
      </div>
    `;
    aiIcon.setAttribute("aria-label", "AI Enhancer");
    aiIcon.addEventListener("click", () => showTooltip(aiIcon));
    inputContainer.appendChild(aiIcon);
  }
}

// Use MutationObserver to continuously observe the DOM
const observer = new MutationObserver((mutationsList) => {
  mutationsList.forEach((mutation) => {
    if (mutation.type === "childList") {
      // Check if the chat input container is added or updated
      const inputContainer = document.querySelector("div._ak1r");
      if (inputContainer) {
        addAIIcon();
      }
    }
  });
});

// Start observing the document body for changes
observer.observe(document.body, { childList: true, subtree: true });
observer.observe(document.body, { childList: true, subtree: true });