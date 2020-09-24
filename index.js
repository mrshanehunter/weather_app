console.log("Hello");

const cityName = document.querySelector("#cityName");
const apiKey = "35a0066e664dc528de7669d54b7a6267";
const listGroupItem = document.querySelector("#cityCard");

document.getElementById("getCityWeather").addEventListener("submit", (e) => {
  e.preventDefault();
  let cityValue = cityName.value;
  const queryData = `${cityValue}&appid=${apiKey}&units=metric`;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${queryData}`)
    .then((response) => response.json())
    .then((data) => {
      const { main, name, weather } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cpdn.io/162656/${weather[0]["icon"]}.svg`;
      const li = document.createElement("li");
      listGroupItem.classList.add("city");
      const html = `
        <div class="list-group-item card card_layout data-name="${name}">
        <h3 class="city-name" data-name="${name}"><strong>${name}</strong></h3>
          <div class="city-temp">
          <h4>Today's Temp: ${main.temp} C</h4>
          </div>
          <div class="city-weather">
          <h4>${weather.main}</h4>
          <h5>${weather.description}</h5>
          <h5>Feels like: ${main.feels_like}</h5>
          </div>
          <div>
          <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
        </div>
      </div>
      </div>
        `;
      listGroupItem.innerHTML = html;
      listGroupItem.appendChild(list - group);
    });
});
