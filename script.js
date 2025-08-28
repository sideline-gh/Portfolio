function typeWriter(el, text, speed = 50, callback) {
  let i = 0;
  function typing() {
    if (i < text.length) {
      el.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else if (callback) {
      callback();
    }
  }
  typing();
}
document.addEventListener("DOMContentLoaded", () => {
  typeWriter(document.querySelector(".iGot"), "i got", 70);

  setTimeout(() => {
    typeWriter(document.querySelector(".blackk"), "Black", 80);
  }, 500);

  setTimeout(() => {
    typeWriter(document.querySelector(".whitee"), "White", 80);
  }, 1100);

  setTimeout(() => {
    typeWriter(document.querySelector(".whatYouWant"), "what you want?", 35);
  }, 1650);
});

