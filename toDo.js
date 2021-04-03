const toDoBtn = document.querySelector(".toDoBtn");
const toDoPopUp = document.querySelector(".toDoPopUp")

const onToDoClick = () => {
  toDoPopUp.classList.toggle("visible");
  toDoInput.focus();  // autofocus
}

toDoBtn.addEventListener("click", onToDoClick) ;



//=====================================
const toDoForm = document.querySelector(".toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".toDoList");

let toDos = [];

const saveStorage = () => {
  // Only string can be saved in localStorage
  localStorage.setItem("toDos", JSON.stringify(toDos));
}

const deleteToDo = (event) => {
  const li = event.target.parentNode;
  // html 
  toDoList.removeChild(li);
  // filter
  const cleanToDos = toDos.filter(toDo => {
    return toDo.id !== parseInt(li.id)
  })
  toDos = cleanToDos;
  saveStorage();
}

// create list 
const showToDo = (text) => {
  const id = toDos.length + 1;

  const li = document.createElement('li');
  const inputCheck = document.createElement('input');
  inputCheck.id = id;
  inputCheck.type='checkbox';

  const label = document.createElement('label');
  label.for = id;
  label.innerText = text;

  const deleteBtn = document.createElement('button');
  const editBtn = document.createElement('button');
  deleteBtn.innerHTML = "❌";
  editBtn.innerHTML = "✍"; 
  deleteBtn.addEventListener("click", deleteToDo);

  li.id = id;
  li.appendChild(inputCheck);
  li.appendChild(label);
  li.appendChild(deleteBtn);
  li.appendChild(editBtn);

  toDoList.appendChild(li);

  const toDoObj = {
    text: text,
    id: id
  }
  // push to array
  toDos.push(toDoObj);
  // save to localStorage
  saveStorage();
}

const onSubmitToDo = (event) => {
  event.preventDefault();
  const toDo = toDoInput.value;
  if(toDo === "") {
    return;
  }
  showToDo(toDo);
  toDoInput.value = "";
}

const loadToDos = () => {
  const loadedToDos = JSON.parse(localStorage.getItem("toDos"));

  if(loadedToDos) {
    loadedToDos.forEach(loadedToDo => showToDo(loadedToDo.text));
  }
}


function init() {
  loadToDos();
  toDoForm.addEventListener('submit', onSubmitToDo);
}

init();