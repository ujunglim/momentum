const form = document.querySelector(".askNameForm");
const nameInput = form.querySelector("input");
const greetingText = document.querySelector(".greeting");

const onSubmitGreeting = (event) => {
  event.preventDefault();
  const name = nameInput.value;
  greeting(name);
  localStorage.setItem("currentUser", name);
}

const askForName = () => {
  form.classList.add("visible");
  form.addEventListener("submit", onSubmitGreeting);
}

const greeting = (text) => {
  form.classList.remove("visible");
  greetingText.classList.add("visible");
  greetingText.innerText = `Hello ${text}`;
}

const loadName = () => {
  const currentUser = localStorage.getItem("currentUser");
  if(!currentUser) {
    askForName();
  }
  else {
    greeting(currentUser);
  }
}

function init() {
  loadName();
}

init();