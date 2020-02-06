let thing = {
  "location": {
    "name": "Los Angeles",
    "region": "California",
    "country": "United States of America",
    "lat": 34.05,
    "lon": -118.24,
    "tz_id": "America/Los_Angeles",
    "localtime_epoch": 1581005699,
    "localtime": "2020-02-06 8:14"
  },
  "current": {
    "last_updated": "2020-02-06 08:15",
    "temp_c": 11.1,
    "temp_f": 52.0,
    "condition": {
      "text": "Sunny",
      "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
      "code": 1000
    },
    "wind_mph": 0.0,
    "humidity": 44,
    "feelslike_c": 11.1,
    "uv": 4.0
  },
  "forecast": {
    "forecastday": [
      {
        "date": "2020-02-06",
        "day": {
          "maxtemp_f": 64.2,
          "mintemp_f": 55.6,
          "condition": {
            "text": "Partly cloudy",
            "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
            "code": 1003
          },
          "uv": 4.2
        },
        "astro": {

        }
      },
      {
        "date": "2020-02-07",
        "day": {
          "maxtemp_f": 68.0,
          "mintemp_f": 57.4,
          "condition": {
            "text": "Sunny",
            "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
            "code": 1000
          },
          "uv": 4.3
        },
        "astro": {

        }
      },
      {
        "date": "2020-02-08",
        "day": {
          "maxtemp_f": 69.3,
          "mintemp_f": 59.4,
          "condition": {
            "text": "Partly cloudy",
            "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
            "code": 1003
          },
          "uv": 4.2
        },
        "astro": {

        }
      },
      {
        "date": "2020-02-09",
        "day": {
          "maxtemp_f": 61.3,
          "mintemp_f": 39.6,
          "condition": {
            "text": "Patchy rain possible",
            "icon": "//cdn.weatherapi.com/weather/64x64/day/176.png",
            "code": 1063
          },
          "uv": 2.5
        },
        "astro": {

        }
      },
      {
        "date": "2020-02-10",
        "day": {
          "maxtemp_f": 68.7,
          "mintemp_f": 52.5,
          "condition": {
            "text": "Partly cloudy",
            "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
            "code": 1003
          },
          "uv": 5.0
        },
        "astro": {

        }
      }
    ]
  },
  "alert": {

  }
}

$(document).ready(function () {
  let location = {}
  $("#makeApiCall").on('click', function (event) {
    event.preventDefault()
    let inputCity = $("#inputCityText").val();
    $.getJSON("http://api.weatherapi.com/v1/forecast.json?key=ff4f207a8ae5485cb4320106200402&q=" + inputCity + "&days=" + 5)
      .then(({ current, location, forecast }) => {
        console.log(current)
        console.log(current.condition.text)
        console.log(current.condition.icon)
        console.log(current.uv)
        console.log(location.name)
        console.log(forecast)
        // console.log(forecast.forecastday.date[0])
        // console.log(forecast.forecastday.day[0])

        $('#searchResult').html(`
          <div class="card">
            <h2 class="">${location.name}</h2>
            <div class="card-image">
              <img src="http:${current.condition.icon}" alt="${location.name}">
            </div>
            <div class="card-content">
              <h4>Current Temperature: ${current.temp_f}℉</h4>
              <h5>Humidity: ${current.uv}</h5>
              <h5>UV Index: ${current.uv}</h5>
              <h5>Wind Speed: ${current.wind_mph} Mph</h5>
            </div>
            <div class="card-action">
               <!--<button class="btn waves-effect waves-light addToCityCards">Add To Recent</button>-->
            </div>
          </div>
         <div>
            


          `)
        $('#inputCityText').val('')
      })
      .catch(e => console.error(e))
    // < div class="container" >
    //   <h4>5 Day Forecast:</h4>
    //   <div class="row">
    //     <div class="col-sm-2 p-1">
    //       <div class="card">
    //         <div class="card-body">
    //           <h4 id="" class="card-title">${forecast.forecastday.date}</h4>
    //           <div class="card-image">
    //             <img src="http:${forecast.condition.icon}" alt="${location.name}">
    //             </div>
    //             <p id="">maxtemp_f</p>
    //             <p id="">mintemp_f</p>
    //             <p id="humiditiy"></p>
    //           </div>
    //         </div>
    //       </div>
    // Store to localStorage

    localStorage.setItem('object', location.city);
    let list = JSON.parse(localStorage.getItem(location.name)) || []
  })
  $(document).on('click', event => {
    if (event.target.classList.contains('addToCityCards')) {
      event.target.parentNode.parentNode.remove()
      let locationElement = document.createElement('div')
      locationElement.className = 'card'
      locationElement.innerHTML = `
      <div id="forcastCards" class="col s12 align-left">Recent
      <div class="align-left card-content">
          <h4>${location.name}</h4>
        </div>
        <div class="card-action">
          <button class="btn waves-effect waves-light removeWatchlist">Remove from Watchlist</button>
        </div>
        </div>
        `
      $('#watchlist').append(locationElement)
    } else if (event.target.classList.contains('removeWatchlist')) {
      event.target.parentNode.parentNode.remove()
    }
  })
})
