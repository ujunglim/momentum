# yumentum

### 1. Clock

### 2. Ask name

### 3. toDo

### 4. Background

### 5. Weather

- get geo location

```javascript
navigator.geolocation.getCurrentPosition(getPosSuccess, getPosError);

const getPosSuccess = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
};
```

- get weather
  https://openweathermap.org/

  For temperature in Celsius use units=metric

  TODO
  daily quote
  daily photo
  offline service
