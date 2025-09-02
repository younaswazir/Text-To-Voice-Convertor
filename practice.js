let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

// Function to load voices
function loadVoices() {
  voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    // clear previous options
    voiceSelect.innerHTML = "";

    voices.forEach((voice, i) => {
      voiceSelect.options[i] = new Option(voice.name, i);
    });

    // set default voice
    speech.voice = voices[0];
  }
}

// Desktop browsers trigger this event when voices are loaded
window.speechSynthesis.onvoiceschanged = loadVoices;

// Mobile fix: also load voices on user interaction
document.querySelector("button").addEventListener("click", () => {
  if (voices.length === 0) {
    loadVoices(); // try loading again on mobile
  }

  speech.text = document.querySelector("textarea").value;

  // If no voices available (mobile Safari restriction), fallback to default
  if (!speech.voice && voices.length > 0) {
    speech.voice = voices[0];
  }

  window.speechSynthesis.speak(speech);
});

// Change voice when selecting from dropdown
voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
});
