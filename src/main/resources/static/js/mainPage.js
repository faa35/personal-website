

// Typing Effect Implementation
const words = ["developer", "sportsman", "student"];
let index = 0; // Current word index
let text = ""; // Current text being typed or deleted
let isDeleting = false; // Whether the effect is currently deleting text

function typeEffect() {
    const typingText = document.getElementById("typing-text"); // Get the element where text will be displayed
    const currentWord = words[index]; // Get the current word to type or delete

    // Add characters while typing
    if (!isDeleting && text.length < currentWord.length) {
        text = currentWord.substring(0, text.length + 1); // Add next character
    }
    // Remove characters while deleting
    else if (isDeleting && text.length > 0) {
        text = currentWord.substring(0, text.length - 1); // Remove last character
    }
    // Pause after completing the word and start deleting
    else if (!isDeleting && text.length === currentWord.length) {
        setTimeout(() => (isDeleting = true), 1000); // Pause before deleting
    }
    // Move to the next word after deletion
    else if (isDeleting && text.length === 0) {
        isDeleting = false; // Switch back to typing
        index = (index + 1) % words.length; // Move to the next word
    }

    // Update the text in the HTML
    typingText.textContent = text;

    // Adjust typing speed based on typing or deleting
    setTimeout(typeEffect, isDeleting ? 100 : 150);
}

// Start Typing Effect
typeEffect();
// Navigation Tabs Active State
document.querySelectorAll('.nav-pill').forEach(pill => {
    pill.addEventListener('click', () => {
        document.querySelector('.nav-pill.active').classList.remove('active');
        pill.classList.add('active');
    });
});

