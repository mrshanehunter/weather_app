// Real Time Clock on Local Weather Panel

function showTime() {
  var date = new Date();
  var h = date.getHours(); // 0 - 23
  var m = date.getMinutes(); // 0 - 59
  var s = date.getSeconds(); // 0 - 59
  var session = "AM";

  if (h === 0) {
    h = 12;
  }

  if (h > 11) {
    session = "PM";
  }

  if (h > 12) {
    h = h - 12;
    session = "PM";
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  var time = h + ":" + m + ":" + s + " " + session;
  document.getElementById("MyClockDisplay").innerText = time;
  document.getElementById("MyClockDisplay").textContent = time;

  setTimeout(showTime, 1000);
}

showTime();

//Gets the lat/lon coordinates on page load to render local weather to the screen

const apiKey = "35a0066e664dc528de7669d54b7a6267";

const localListGroupItem = document.querySelector("#local");

function geoFindMe() {
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        const localName = data.name;
        const localTemp = data.main.temp;
        const localFeel = data.main.feels_like;
        const localMin = data.main.temp_min;
        const localMax = data.main.temp_max;
        const localDesc = data.weather[0].main;
        const localDesc1 = data.weather[0].description;
        const localIcon = data.weather[0].icon;
        const localIconIMG = `https://openweathermap.org/img/wn/${localIcon}.png`;

        console.log(localName, localTemp, localFeel, localDesc);

        const li = document.createElement("li");
        localListGroupItem.classList.add("local");
        const localHTML = `
        <div class="list-group-item card card_layout w-75 ml-5 data-name="${localName}">

        <div class="d-flex justify-content-center">
            <div class="local-temp">
                <h2>${Math.round(localTemp)}&#176;C</h2>
            </div>
        </div>   

          <div class="d-flex justify-content-center">
            <div class="local-city">
                <h2><strong>${localName}</strong></h2>
            </div>
        </div>  

        <div class="d-flex justify-content-center">
        <div class="local-feels-like">
        <h4>Feels like: ${Math.round(localFeel)}&#176;C</h4>
        </div>
        </div>
        
        <hr>
        
        <div class="d-flex justify-content-center">
            <div class="local-range">
            <h5>Min: ${Math.round(localMin)}&#176;C - Max: ${Math.round(
          localMax
        )}&#176C</h5>
            </div>
            </div>

        <hr>    
            <div class="d-flex justify-content-center">
            <h5>${localDesc}: ${localDesc1}</h5>
            </div>
            <div class="d-flex justify-content-center">
            <img class="local-icon" src="${localIconIMG}" width="200" height="150"/>
            </div>
            
        </div>
        
          `;
        localListGroupItem.innerHTML = localHTML;
        localListGroupItem.appendChild(list - group);
      });
  }

  function error() {
    status.textContent = "Unable to retrieve your location";
  }

  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported by your browser";
  } else {
    status.textContent = "Locating…";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

document.onload = geoFindMe();

//Gets the weather for a given city based on user input

const cityName = document.querySelector("#cityName");

const listGroupItem = document.querySelector("#cityCard");

document.getElementById("getCityWeather").addEventListener("submit", (e) => {
  e.preventDefault();
  let cityValue = cityName.value;
  const queryData = `${cityValue}&appid=${apiKey}&units=metric`;

  if (cityValue === "") {
    alert("Warning: Invalid Entry - please try again");
  } else {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${queryData}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const name = data.name;
        const temp = data.main.temp;
        const weatherMain = data.weather[0].main;
        const weatherDesc = data.weather[0].description;
        const feelsLike = data.main.feels_like;
        const country = data.sys.country;
        const icon = data.weather[0].icon;
        const iconIMG = `https://openweathermap.org/img/wn/${icon}.png`;

        const html = `
        <div class="list-group-item card card_layout data-name="${name}" style="box-shadow: 5px 5px 7px rgba(202,200,200,0.45"> 
           <h3 class="city-name" data-name="${name},${country}">${name}  <sup>${country}</sup></h3>
            <hr>
                <div class="city-temp"> 
                    <h3>${Math.round(temp)} &deg;C</h3>
                </div>
          
                <div class="city-weather">
                    <h4>${weatherMain}:</h4>
                        <img class="city-icon" src="${iconIMG}" width="100" height="100"/>
                        <h5>${weatherDesc}</h5> 
                    <hr>
                    <h5>Feels like: ${Math.round(feelsLike)} &deg;C</h5>
                </div>
        </div>
        `;
        listGroupItem.innerHTML = html;
        listGroupItem.appendChild(list - group);
      });
  }
});

/* <div>
          <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
        </div> */
