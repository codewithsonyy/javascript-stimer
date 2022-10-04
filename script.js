"strict";
//////Selection///////////
let labelTimer = document.querySelector(".timer");
const closeBtn = document.querySelector(".btn");
const wholeContainer = document.querySelector(".container");
const overlay = document.querySelector(".overlay");
const nav = document.querySelector(".nav");
const navOptions = document.querySelectorAll(".nav-link");
const subCategory = document.querySelectorAll(".link-bar--subcategory-wrapper");
const hideSubCategory = document.querySelector(".hide");
const refreshBtn = document.querySelector(".refresh");
const playBtn = document.querySelector(".play");
const pauseBtn = document.querySelector(".pause");

//////////FUNCTIONS////////

let timer;
var isPaused = false;
let clickedinfo = "30";
let timeSet;
let isRefreshed = false;

function play() {
  if (!timer) timer = endTimer(30);
  isRefreshed = false;
  isPaused = false;
  playBtn.classList.add("hidden");
  pauseBtn.classList.remove("hidden");
}
function pause() {
  pauseBtn.classList.add("hidden");
  playBtn.classList.remove("hidden");
  isPaused = true;
  isRefreshed = true;
}
const close = function (e) {
  wholeContainer.classList.add("hidden");
};

const hideMenu = function () {
  hideSubCategory.classList.remove("overlay-sub");
  // clicked.classList.remove("nav-option--active");//not working coz clicked value is null on menu
  navOptions.forEach((t) => t.classList.remove("nav-option--active"));
  subCategory.forEach((c) => c.classList.remove("subcategory--active"));
};

const endTimer = function (t) {
  const tick = function () {
    const min = String(Math.trunc(timeSet / 60)).padStart(2, 0);
    const sec = String(timeSet % 60).padStart(2, 0);
    if (!isRefreshed) {
      labelTimer.textContent = `${min}:${sec}`;
      if (!isPaused) {
        if (timeSet === 0) {
          clearInterval(timer);
        } else --timeSet;
      }
    }
  };
  timeSet = Number(t) * 60;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

///////EVENT HANDLERS//////

closeBtn.addEventListener("click", close);

overlay.addEventListener("click", close);

nav.addEventListener("click", function (e) {
  e.preventDefault();
  const clicked = e.target.closest(".nav-link");
  if (!clicked) return;
  hideSubCategory.classList.add("overlay-sub");
  navOptions.forEach((t) => t.classList.remove("nav-option--active"));
  subCategory.forEach((c) => c.classList.remove("subcategory--active"));
  clicked.classList.add("nav-option--active");
  datavalue = clicked.dataset.btn;
  document
    .querySelector(`.wrapper--${datavalue}`)
    .classList.add("subcategory--active");
});

document
  .querySelectorAll(`.link-bar--subcategory-wrapper `)
  .forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      hideMenu();
      const clickedOption = e.target.closest(".link-bar--option");
      if (clickedOption.classList.contains("file")) {
        close();
      }
      if (clickedOption.classList.contains("actions--1")) {
        if (pauseBtn.classList.contains("hidden")) {
          play();
        } else {
          pause();
        }
      }
      if (clickedOption.classList.contains("actions--2")) {
        // if (pauseBtn.classList.contains("hidden")) {
        //   isPaused = true;
        // }
        if (timer) {
          clearInterval(timer);
          isRefreshed = false;
          timer = endTimer(clickedinfo);
        }
      }
      if (clickedOption.classList.contains("set")) {
        clickedinfo = clickedOption.textContent;
        if (timer) clearInterval(timer);
        isRefreshed = false;
        timer = endTimer(clickedOption.textContent);
      }
      if (clickedOption.classList.contains("help--1")) {
        location.href = "privacy.html";
      }
    });
  });

hideSubCategory.addEventListener("click", hideMenu);

refreshBtn.addEventListener("click", function () {
  if (timer) {
    clearInterval(timer);
    isRefreshed = false;
    timer = endTimer(clickedinfo);
  }
});

document.addEventListener("keydown", function (e) {
  e.preventDefault();
  if (e.key === "Escape" && !wholeContainer.classList.contains("hidden"))
    close();
  if (e.ctrlKey && e.key === "q") close();
});

document.addEventListener("keydown", function (e) {
  e.preventDefault();
  if (e.key === " ") {
    if (pauseBtn.classList.contains("hidden")) {
      play();
    } else {
      pause();
    }
  }
});

document.addEventListener("keydown", function (e) {
  e.preventDefault();
  if (e.ctrlKey && e.key === "r") {
    if (timer) {
      clearInterval(timer);
      isRefreshed = false;
      timer = endTimer(clickedinfo);
    }
  }
});
