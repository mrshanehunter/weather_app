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
      console.log(data);
      const name = data.name;
      const temp = data.main.temp;
      const weatherMain = data.weather[0].main;
      const weatherDesc = data.weather[0].description;
      const feelsLike = data.main.feels_like;
      const icon = data.weather[0].icon;
      const iconIMG = `http://openweathermap.org/img/wn/${icon}.png`;

      //   const { main, name, weather } = data;
      //   const icon = `https://s3-us-west-2.amazonaws.com/s.cpdn.io/162656/${weather[0]["icon"]}.svg`;
      //   const li = document.createElement("li");
      //   listGroupItem.classList.add("city");
      const html = `
        <div class="list-group-item card card_layout w-50 data-name="${name}" style="box-shadow: 5px 5px 7px rgba(202,200,200,0.45"> 
            <h3 class="city-name" data-name="${name}"><strong>${name}</strong></h3>
            <hr>
                <div class="city-temp">
                    <h4>${Math.round(temp)} &deg;C</h4>
                </div>
          
                <div class="city-weather">
                    <h4>${weatherMain}</h4>
                        <img class="city-icon" src="${iconIMG}" width="150" height="150"/>
                        <h5>${weatherDesc}</h5> 
                    <hr>
                    <h5>Feels like: ${Math.round(feelsLike)} &deg;C</h5>
                </div>
        </div>
        `;
      listGroupItem.innerHTML = html;
      listGroupItem.appendChild("list-group");
    });
});

{
  /* <div>
          <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
        </div> */
}
