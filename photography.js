// jam-area.js

// Add .hero-active on load so nav uses dark text on this hero page
document.body.classList.add("hero-active");

// Simple placeholder actions for MENU / WRITE
document.getElementById("menuButton").addEventListener("click", () => {
  alert("Open main menu overlay here.");
});

document.getElementById("writeButton").addEventListener("click", () => {
  alert("Open contact / write-to-me panel here.");
});
