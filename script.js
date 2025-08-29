const images = document.querySelectorAll(".case-img");
const arrowLeft = document.getElementById("arrowLeft");
const arrowRight = document.getElementById("arrowRight");
const slider = document.querySelector(".slider");
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
let current = 0;

function updateSlider() {
  slider.style.transform = `translateX(-${current * 100}%)`;
  updateText()
}

arrowLeft.addEventListener("click", () => {
  current = (current - 1 + images.length) % images.length;
  updateSlider();
});

arrowRight.addEventListener("click", () => {
  current = (current + 1) % images.length;
  updateSlider();
});

const imageTexts = document.querySelectorAll('.imgText')

function updateText() {
  imageTexts.forEach(el => el.classList.add("textDisabled"));
  
  if (imageTexts[current]){
    imageTexts[current].classList.add('textEnabled')
    imageTexts[current].classList.remove('textDisabled')
  }
}

updateText();
