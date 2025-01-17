const toDoBtn = document.querySelector(".toDoBtn");
const toDoPopUp = document.querySelector(".toDoPopUp")
const toDoList = document.querySelector(".toDoList");
const toDoForm = document.querySelector(".toDoForm");
const toDoInput = toDoForm.querySelector("input");
let toDos = [];

const onToDoClick = () => {
  toDoPopUp.classList.toggle("visible");
  toDoInput.focus();  // autofocus
}

toDoBtn.addEventListener("click", onToDoClick) ;

const saveStorage = () => {
  // Only string can be saved in localStorage
  localStorage.setItem("toDos", JSON.stringify(toDos));
}

const deleteToDo = (event) => {
  const li = event.target.parentNode;
  // html 
  toDoList.removeChild(li);
  // localstorage
  const cleanToDos = toDos.filter(toDo => {
    return toDo.id !== parseInt(li.id)
  })
  toDos = cleanToDos;
  saveStorage();
}

const onExpandTextarea = ({ target }) => {
  target.rows = Math.ceil(target.value.length / 25);
}

const editToDo = (event) => {
  const li = event.target.parentNode;
  const content = li.querySelector(".toDoContent");
  
  content.removeAttribute("disabled");
  content.focus();
  content.classList.add("editing");
  content.rows = Math.ceil(content.value.length / 25);

  content.addEventListener('input', onExpandTextarea)
  content.addEventListener("keypress", (event) => {
    if(event.key === "Enter") {
      // when input is empty
      if(!event.target.value) {
        content.value = toDos[li.id].text;
      }
      else {
        toDos[li.id].text = content.value;
      } 
      saveStorage();
      content.disabled = "true";
      content.classList.remove("editing");
    }
  });
}

// create list 
const showToDo = (text, isChecked) => {
  const id = toDos.length;
  const li = document.createElement('li');
  const inputCheck = document.createElement('input');
  inputCheck.id = id;
  inputCheck.type= 'checkbox';
  inputCheck.className = "checkbox";
  
  
  inputCheck.addEventListener("click", () => {
    content.classList.toggle("checked");
    toDoObj.isChecked = !toDoObj.isChecked;
    saveStorage();
  });

  const label = document.createElement('label');
  label.for = id;

  const content = document.createElement('textarea');
  content.className = "toDoContent";
  content.value = text;
  content.disabled = "true";
  content.rows = Math.ceil(content.value.length / 25);

  if(isChecked) {
    inputCheck.checked = true;
    content.classList.add("checked");
  }

  const editBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');
  editBtn.innerHTML = "✍"; 
  deleteBtn.innerHTML = "❌";
  editBtn.addEventListener("click", editToDo);
  deleteBtn.addEventListener("click", deleteToDo);

  li.id = id;
  li.appendChild(inputCheck);
  li.appendChild(label);
  li.appendChild(content);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  toDoList.appendChild(li);

  const toDoObj = { text, id, isChecked };
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
    loadedToDos.forEach(loadedToDo => showToDo(loadedToDo.text, loadedToDo.isChecked));
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener('submit', onSubmitToDo);
}

init();