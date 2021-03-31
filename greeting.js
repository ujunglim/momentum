const form = document.querySelector(".jsForm");
const nameInput = form.querySelector("input");
const greetingText = document.querySelector(".greeting");

const onSubmit = (event) => {
  event.preventDefault();
  const name = nameInput.value;
  greeting(name);
  localStorage.setItem("currentUser", name);
}

const askForName = () => {
  form.classList.add("showing");
  form.addEventListener("submit", onSubmit);
}

const greeting = (text) => {
  form.classList.remove("showing");
  greetingText.classList.add("showing");
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