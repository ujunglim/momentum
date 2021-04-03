

const toDoBtn = document.querySelector(".toDoBtn");

const onToDoClick = () => {
  console.log("clicked")
}

toDoBtn.addEventListener("click", onToDoClick) ;



//=====================================
const toDoForm = document.querySelector(".toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".toDoList");

let toDos = [];

const saveToDos = () => {
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
  saveToDos();
}

const showToDo = (text) => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const deleteBtn = document.createElement('button');
  // const editBtn = document.createElement('button');
  const id = toDos.length + 1;

  span.innerText = text;
  deleteBtn.innerHTML = "❌";
  // editBtn.innerHTML = "✍"; 
  deleteBtn.addEventListener("click", deleteToDo);


  li.id = id;
  li.appendChild(span);
  li.appendChild(deleteBtn);
  // li.appendChild(editBtn);

  toDoList.appendChild(li);

  const toDoObj = {
    text: text,
    id: id
  }
  // push to array
  toDos.push(toDoObj);
  // save to localStorage
  saveToDos();
}

const onSubmitToDo = (event) => {
  event.preventDefault();
  const toDo = toDoInput.value;
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