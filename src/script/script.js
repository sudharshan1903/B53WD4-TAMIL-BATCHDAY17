console.log("Linked");
let mainDiv = document.createElement("div");
let secDiv = document.createElement("div");
secDiv.classList.add("row", "g-3", "mt-2");
mainDiv.classList.add("container");
document.body.append(mainDiv);
mainDiv.append(secDiv);

let urlone = fetch("https://restcountries.com/v3.1/all");

urlone
    .then((res) => {
        console.log(res);
        return res.json();
    })
    .catch(reason => console.error(reason))
    .then((restDat) => {
        restDat.sort((a, b) => {
            if (a.name["common"] < b.name["common"]) {
                return -1;
            }
        })
        console.log(restDat);

        let cardData = restDat.map((restDat) => {
            return `<div class="col-3">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-header text-center">${restDat.name.common}</h5>
                        <div class="i-img ">
                            <img class="card-img-top round" src="${restDat.flags.svg}" alt="${restDat.flags.alt}">
                        </div>
                        <h6 class="text-center ioi">Region: ${restDat.region}</h6>
                        <h6 class="text-center">Country code: ${restDat.cca3}</h6>
                        <h6 class="text-center">Capital: ${restDat.capital}</h6>
                        <div class="d-grid d-md-flex justify-content-md-center ioi">
                            <button class="btn btn-primary fsont" data-lat="${restDat.capitalInfo ? restDat.capitalInfo.latlng?.[0] : 'N/A'}" data-lon="${restDat.capitalInfo ? restDat.capitalInfo.latlng?.[1] : 'N/A'}"><i class="bi bi-person-walking"></i> Click for Weather</button>
                        </div>
                    </div>
                </div>
            </div>`;
        }).join("");
        

        secDiv.innerHTML = cardData;

        // Add event listener for weather button click
        secDiv.querySelectorAll('.btn-primary').forEach(button => {
            button.addEventListener('click', () => {
                const lat = button.dataset.lat;
                const lon = button.dataset.lon;
                if (lat && lon && lat !== 'N/A' && lon !== 'N/A') {
                    getWeatherData(lat, lon);
                } else {
                    alert('Weather information not available for this country.');
                }
            });
        });
    });

// Function to fetch weather data
function getWeatherData(lat, lon) {
    const apiKey = '4176aa73331ea5ac36594ebadc5aa2a8';
    // const exclude = "hourly,daily";
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(weatherApiUrl)
        .then(response => response.json())
        .then(weatherData => {
            console.log('Weather Data:', weatherData);
            // Handle the weather data here (update the UI, display a modal, etc.)
            alert(`Weather in this location: ${weatherData.current.weather[0].description}`);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}
