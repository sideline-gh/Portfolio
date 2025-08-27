function typeWriter(el, text, speed=50) {
  let i = 0;
  function typing() {
    if (i < text.length) {
      el.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

document.addEventListener("DOMContentLoaded", () => {
  typeWriter(document.querySelector(".right-hero h1"), "Programmer", 120);
  typeWriter(document.querySelector(".left-hero h1"), "Graphic Designer", 120);
});