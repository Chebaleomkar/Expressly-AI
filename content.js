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
    "Grateful 🙏",
    "Motivational 💪",
    "Relaxed 🧘",
    "Romantic 💖",
    "Cheerful 😊",
    "Nostalgic 🕰️",
    "Friendly 🤗",
    "Optimistic 🌟",
    "Funny 😂",
    "Encouraging 🤝",
    "Apologetic 🙇",
    "Supportive 💕",
    "Mysterious 🕵️",
    "Playful 🥳",
    "Worried 😟",
    "Serious 🤔",
    "Energetic ⚡",
    "Bored 😐",
    "Empathetic 🤲",
    "Adventurous 🧗",
    "Proud 🦁",
    "Hopeful 🌈",
    "Surprised 😲",
    "Determined 🎯",
    "Shy 🙈",
    "Focused 🧐",
    "Blessed ✨",
    "Tired 💤",
    "Curious 🦉",
    "Warm ❤️‍🔥",
    "Caring 🤗",
    "Peaceful ✌️",
];
//utilities

let selectedMoods = [];

// Function to handle mood selection
function handleMoodSelection(moodButton, mood) {
  // Toggle mood selection
  if (selectedMoods.includes(mood)) {
    // Deselect mood
    selectedMoods = selectedMoods.filter((m) => m !== mood);
    moodButton.style.backgroundColor = "#666"; // Default background color
  } else {
    // Select mood
    selectedMoods.push(mood);
    moodButton.style.backgroundColor = "#007bff"; // Selected background color
  }

  console.log("Selected Moods:", selectedMoods);
}

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
          ${moodArray.map((mood) => `<button id= >${mood}</button>`).join("")}
        </div>
      </div>
  
      <div id="prompt" class="tooltip-tab-content">
        <textarea id="prompt-input" placeholder="Specify how you want the message to sound..."></textarea>
      </div>
  
      <div id="settings" class="tooltip-tab-content">
        <h2>Theme Settings</h2>
        <label>
          <input type="radio" name="theme" value="light"> Light Theme
        </label>
        <label>
          <input type="radio" name="theme" value="dark" checked> Dark Theme
        </label>
      </div>
  
    <div style="visibility:hidden;" class="tooltip-actions ">
  <input type="text" id="input-box" placeholder="Enter text here" />
  <div class="button-group">
    <button class="text-sm font-bold" id="accept-button">Accept</button>
    <button id="discard-button">Discard</button>
    <button id="regenerate-button">Regenerate</button>
  </div>
</div>

    `;
    return tooltip;
}

// Function to show the tooltip
function showTooltip(aiIcon) {
    const tooltip = createTooltip();
    document.body.appendChild(tooltip);

    // Position the tooltip above the AI icon
    const iconRect = aiIcon.getBoundingClientRect();
    tooltip.style.position = "absolute";
    tooltip.style.bottom = `10%`;
    tooltip.style.right = `1.5rem`;

    // Add event listeners for tabs, themes, and actions
    setupTooltipFunctionality(tooltip);

    const moodButtons = tooltip.querySelectorAll(".moods-list button");
    moodButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const mood = button.textContent;
        handleMoodSelection(button, mood);
      });
    });

    const promptTextarea= tooltip.querySelector("#prompt-input");
    if(!promptTextarea){
        console.log('TextArea failed to load')
    }
    if (promptTextarea) {
        promptTextarea.addEventListener("input", (event) => {
          const userInput = event.target.value;
          console.log("User Input in Prompt:", userInput);
        });
      }

}

// Function to handle tooltip functionality
function setupTooltipFunctionality(tooltip) {
    const tabButtons = tooltip.querySelectorAll(".tooltip-tab-button");
    const tabContents = tooltip.querySelectorAll(".tooltip-tab-content");
    const themeRadios = tooltip.querySelectorAll('input[name="theme"]');
    const acceptButton = tooltip.querySelector("#accept-button");
    const discardButton = tooltip.querySelector("#discard-button");
    const regenerateButton = tooltip.querySelector("#regenerate-button");

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

    // Actions
    acceptButton.addEventListener("click", () => {
        console.log("Message Accepted");
        tooltip.remove();
    });

    discardButton.addEventListener("click", () => {
        console.log("Message Discarded");
        tooltip.remove();
    });

    regenerateButton.addEventListener("click", () => {
        console.log("Regenerating Message");
    });
}

// Function to add the AI icon
function addAIIcon() {
    const inputContainer = document.querySelector("div._ak1r");

    if (inputContainer) {
        const aiIcon = document.createElement("button");
        aiIcon.innerHTML = `
        <span aria-hidden="true" data-icon="ai" class="">
          <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" fill="none">
            <title>AI</title>
            <path fill="currentColor" d="M12 2L2 22h20L12 2zm0 4l7 14H5l7-14z"></path>
          </svg>
        </span>
      `;
        aiIcon.className = "xjb2p0i xk390pu x1ypdohk xjbqb8w x972fbf xcfux6l x1qhh985 xm0m39n xexx8yu x4uap5 x18d9i69 xkhd6sd xfect85";
        aiIcon.setAttribute("aria-label", "AI Enhancer");
        aiIcon.style.marginLeft = "8px";

        // Show tooltip on click
        aiIcon.addEventListener("click", () => {
            showTooltip(aiIcon);
        });

        inputContainer.appendChild(aiIcon);
    }
}

// Use MutationObserver to wait for the DOM to load
const observer = new MutationObserver(function (mutationsList, observer) {
    const inputContainer = document.querySelector("div._ak1r");
    if (inputContainer) {
        addAIIcon();
        observer.disconnect(); // Stop observing once the container is found
    }
});

// Start observing the document body for changes
observer.observe(document.body, { childList: true, subtree: true });