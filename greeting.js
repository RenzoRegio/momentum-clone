const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greeting");

const USER_CN = "currentUser",
  SHOW_CN = "showing";

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function saveName(text) {
  localStorage.setItem(USER_CN, text);
}

function askForName() {
  form.classList.add(SHOW_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOW_CN);
  greeting.classList.add(SHOW_CN);
  greeting.innerText = `Hello, ${text}! How are you doing today?`;
}

function paintName() {
  const currentUser = localStorage.getItem(USER_CN);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  paintName();
}
init();
