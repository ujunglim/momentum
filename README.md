# yumentum

clone of Chrome's Momentum with

- live server
- gh page
- [Backgroud Image API: Unsplash](https://unsplash.com/documentation)
- [Weather API: openweathermap](https://openweathermap.org/)
- [Quote API](https://type.fit/api/quotes)
- [Icon: Fontawesome](https://fontawesome.com/)

![1](/images/1.png)

## <br/>

## [Try at here👆](https://ujunglim.github.io/yumentum/)

## <br/>

---

### 0. First Visit

When visiting the first page, whether the user agrees to provide location information and displays the name input window under the clock.

![2](/images/2.png)

### 1. Weather

- Load Coordinate
  <br/> If it is the device that attempted to visit for the first time or if there is no information, loadCoord() is called.

```js
const loadCoord = () => {
  const loadedCoord = localStorage.getItem(COORD);
  if (!loadedCoord) {
    askForCoord();
  } else {
    // get weather
    const parsedCoord = JSON.parse(loadedCoord);
    getWeather(parsedCoord.latitude, parsedCoord.longitude);
  }
};
```

- Ask for Coordinate
  <br/> navigator.geolocation.getCurrentPosition(getPosSuccess, getPosError);

```js
const askForCoord = () => {
  navigator.geolocation.getCurrentPosition(getPosSuccess, getPosError);
};

const getPosSuccess = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
};

const getPosError = (error) => {
  console.log(error.message, "Can't access geo location");
};
```

- get weather
  <br /> For temperature in Celsius use "units=metric"

```js
const getWeather = (lat, lon) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const weather = data.weather[0].main;
      const temp = Math.round(data.main.temp);
      const location = data.name;
      let icon;
      const hour = new Date().getHours();
    });
};
```

### 2. Greeting

![greeting](/images/greeting.gif)

- Load Name

```js
const loadName = () => {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    askForName();
  } else {
    showGreeting(currentUser);
  }
};
```

- Ask name
  <br/> When user first visits

```js
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
```

- Show greeting depends on time

```js
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
```

### 3. Clock

```js
const getTime = () => {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
};

setInterval(() => getTime(), 1000);
```

### 4. ToDo

![todo](/images/todo.gif)

- Load ToDos
  <br/> Array.forEach() executes a provided function once for each array element

```js
const loadToDos = () => {
  const loadedToDos = JSON.parse(localStorage.getItem("toDos"));

  if (loadedToDos) {
    loadedToDos.forEach((loadedToDo) =>
      showToDo(loadedToDo.text, loadedToDo.isChecked)
    );
  }
};
```

- Show ToDos
  <br/> createElement(), appendChild(), DOM.toggle(), DOM.checked

```js
const id = toDos.length;
const li = document.createElement("li");
const inputCheck = document.createElement("input");
const label = document.createElement("label");
const content = document.createElement("textarea");
const editBtn = document.createElement("button");
const deleteBtn = document.createElement("button");
const toDoObj = { text, id, isChecked };

inputCheck.id = id;
inputCheck.type = "checkbox";
inputCheck.className = "checkbox";
inputCheck.addEventListener("click", () => {
  content.classList.toggle("checked");
  toDoObj.isChecked = !toDoObj.isChecked;
  saveStorage();
});

label.for = id;

content.className = "toDoContent";
content.value = text;
content.disabled = "true";
content.rows = Math.ceil(content.value.length / 25);

if (isChecked) {
  inputCheck.checked = true;
  content.classList.add("checked");
}

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

// push to array
toDos.push(toDoObj);
// save to localStorage
saveStorage();
```

- Edit ToDo
  <br/> DOM.removeAttribute()

```js
const li = event.target.parentNode;
const content = li.querySelector(".toDoContent");

content.removeAttribute("disabled");
content.focus();
content.classList.add("editing");
content.rows = Math.ceil(content.value.length / 25);

content.addEventListener("input", onExpandTextarea);
content.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    // when input is empty
    if (!event.target.value) {
      content.value = toDos[li.id].text;
    } else {
      toDos[li.id].text = content.value;
    }
    saveStorage();
    content.disabled = "true";
    content.classList.remove("editing");
  }
});
```

- Delete ToDo
  <br/> Array.filter(item => standard)

```js
const li = event.target.parentNode;
// html
toDoList.removeChild(li);
// localstorage
const cleanToDos = toDos.filter((toDo) => {
  return toDo.id !== parseInt(li.id);
});
toDos = cleanToDos;
saveStorage();
```

### 5. Background Image

- loadBGImage
  <br/>fetch("url").then(response => response.json()).then(data => {})

```js
const loadBGImage = () => {
  fetch(
    `https://api.unsplash.com/search/photos/?query=nature&color=black&orientation=landscape&client_id=${UNSPLASH_KEY}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const images = data.results;
      const index = Math.floor(Math.random() * images.length);
      const img = images[index];

      showBGImage(img);
      showBGImageInfo(img);
    });
};
```

- showBGImage

```js
const showBGImage = (img) => {
  const url = img.urls.regular;
  body.style.backgroundImage = `url("${url}")`;
};
```

- showBGImageInfo

Show Full view of Background Image and info about location, photogrpher.

![bg](/images/bg.gif)

```js
const showBGImageInfo = (img) => {
  const link = img.links.html;
  let location = img.user.location;
  const photographer = img.user.name;

  if (!location) {
    location = "Unsplash nature";
  }

  linkDOM.href = link;
  locationDOM.innerText = location;
  photographerDOM.innerText = photographer;
};
```

### 6. Search on google

<br/>

![search](/images/search.gif)

<br/>window.open("url")

```js
event.preventDefault();
const value = searchInput.value;
window.open(`https://www.google.com/search?q=${value}`);
searchInput.value = "";
```

### 7. Quote

![quote](/images/quote.gif)

Show Quote and Author

```js
const getQuote = () => {
  fetch("./quotes.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const randomNum = Math.floor(Math.random() * data.length);
      quote.innerText = `"${data[randomNum].text}"`;
      quoteAuthor.innerText = data[randomNum].author;
    });
};
```

---

### TODO

- dynamic count of letter in a line of textarea
- catch
- fix repetitive
- edit user name
