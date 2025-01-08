fetch("src/app/mainSection/mainSection.html")
  .then((response) => response.text())
  .then((data) => {
    // Inject the main section HTML into the placeholder
    document.getElementById("mainSection-placeholder").innerHTML = data;

    // Start the typewriter effect after the content is loaded
    typeWriterEffect();
  })
  .catch((error) => console.error("Error loading the main Section:", error));


const texts = [
  "student",
  "software engineer",
  "volunteer",
  "football enthusiast",
  "pokemon enthusiast",
];
let index = 0;

function typeWriterEffect() {
  const dynamicText = document.getElementById("dynamic-text");

  // Check if the element exists
  if (!dynamicText) return;

  let text = texts[index];
  dynamicText.textContent = ""; // Clear previous text

  let i = 0;
  const interval = setInterval(() => {
    dynamicText.textContent += text[i];
    i++;
    if (i === text.length) {
      clearInterval(interval); // Stop typing when the word is complete
      setTimeout(() => {
        index = (index + 1) % texts.length; // Cycle to the next text
        typeWriterEffect();
      }, 1000); // Pause before typing the next word
    }
  }, 150); // Typing speed
}
