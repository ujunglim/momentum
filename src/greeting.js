const form = document.querySelector(".askNameForm");
const nameInput = form.querySelector("input");
const greeting = document.querySelector(".greeting");

const onSubmitName = (event) => {
  event.preventDefault();
  const name = nameInput.value;
  showGreeting(name);
  localStorage.setItem("currentUser", name);
};

const askForName = () => {
  form.classList.add("visible");
  form.addEventListener("submit", onSubmitName);
};

const showGreeting = (text) => {
  form.classList.remove("visible");
  const hours = new Date().getHours();
  let greetingText;

  if (6 <= hours && hours < 12) {
    greetingText = "Good morning,";
  } else if (12 <= hours && hours < 18) {
    greetingText = "Good afternoon,";
  } else if (18 <= hours && hours < 24) {
    greetingText = "Good evening,";
  }

  greeting.classList.add("visible");
  greeting.innerText = `${greetingText} ${text}.`;
};

const loadName = () => {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    askForName();
  }
  else {
    showGreeting(currentUser);
  }
};

function init() {
  loadName();
}

init();
