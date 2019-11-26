window.addEventListener("load", () => {
  let long;
  let lat;
  const temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  const temperatureDegree = document.querySelector(".temperature-degree");
  const locationTimezone = document.querySelector(".location-timezone");
  const temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");
  const descriptionFuture = document.querySelector(".description-future");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/eb9d28c07b047831e664f8c758a456e1/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          const presentDate = new Date();
          const presentHour = 6; //presentDate.getHours();

          if (presentHour > 5 && presentHour < 12) {
            //change bg color
          }

          //Set DOM Elements from the API
          temperatureDegree.textContent = Math.floor(temperature) + "°";
          temperatureDescription.textContent = "Today: " + summary;
          locationTimezone.textContent = "Timezone: " + data.timezone;
          descriptionFuture.textContent = "Future: " + data.daily.summary;

          //Formula for Celsius
          let celsius = (temperature - 32) * (5 / 9);
          // Set Icon
          setIcons(icon, document.querySelector(".icon"));
          //Change Temperature to Celsius/Farenheit
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius) + "°";
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = Math.floor(temperature) + "°";
            }
          });
        });
    });
  } else {
    h1.textContent = "Enable Geolocation to proceed";
  }

  const setIcons = (icon, iconId) => {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
  };
});
