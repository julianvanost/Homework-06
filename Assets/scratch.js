let thing = {
  "location": {
    "name": "Kansas City",
    "region": "Missouri",
    "country": "United States of America",
    "lat": 39.1,
    "lon": -94.58,
    "tz_id": "America/Chicago",
    "localtime_epoch": 1580837042,
    "localtime": "2020-02-04 11:24"
  },
  "current": {
    "last_updated_epoch": 1580836508,
    "last_updated": "2020-02-04 11:15",
    "temp_c": 0,
    "temp_f": 32,
    "is_day": 1,
    "condition": {
      "text": "Overcast",
      "icon": "//cdn.weatherapi.com/weather/64x64/day/122.png",
      "code": 1009
    },
    "wind_mph": 10.5,
    "wind_kph": 16.9,
    "wind_degree": 30,
    "wind_dir": "NNE",
    "pressure_mb": 1018,
    "pressure_in": 30.5,
    "precip_mm": 0,
    "precip_in": 0,
    "humidity": 58,
    "cloud": 100,
    "feelslike_c": -4.8,
    "feelslike_f": 23.4,
    "vis_km": 16,
    "vis_miles": 9,
    "uv": 1,
    "gust_mph": 15.4,
    "gust_kph": 24.8
  }
}
let object = {}
$(document).ready(function () {
  $("#makeApiCall").on('click', function (event) {
    event.preventDefault()
    let inputCity = $("#inputCityText").val();
    $.getJSON("http://api.weatherapi.com/v1/current.json?key=ff4f207a8ae5485cb4320106200402&q=" + inputCity)
      .then(({ current, location }) =>
        object = {
          current: Current,
          location: Location,
          current.condition: Condition,
        }
        console.log(current)
        console.log(current.condition.text)
        console.log(current.condition.icon)
        console.log(current.uv)
        console.log(location.name)
        $('#searchResult').html = `
          <div class="card">
          <div class="card-image">
          <img src="${Condition.icon}" alt="${Location.name}">
          <span class="card-title">${Location.name}</span>
            </div>
            <div class="card-content">
              <h4>Current Temperature: ${Current.temp_f}℉</h4>
              <h5>UV Index: ${Current.uv}</h5>
              <h5>Condition: ${Condition.text}</h5>
              <h5>Windspeed: ${Current.wind_mph} Mph</h5>
            </div>
            <div class="card-action">
              <button class="btn waves-effect waves-light addToCityCards">Add To Recent</button>
            </div>
          </div>
          `
        $('#searchResult').value = ''
      })
    .catch(e => console.error(e))
  // Store to localStorage
  localStorage.setItem('movie', JSON.stringify(object));
  let list = JSON.parse(localStorage.getItem(location.name)) || []
})
$(document).on('click', event => {
  if (event.target.classList.contains('addToCityCards')) {
    event.target.parentNode.parentNode.remove()
    let weatherElement = document.createElement('div')
    weatherElement.className = 'card'
    weatherElement.innerHTML = `
        <div class="card-content">
          <h3>${Current.name}</h3>
          <h4>Condition ${Condition.text}</h4>
          <h5>Temperature: ${Current.temp_f}℉</h5>
        </div>
        <div class="card-action">
          <button class="btn waves-effect waves-light removeWatchlist">Remove from Watchlist</button>
        </div>
        `
    $('#watchlist').append(weatherElement)
  } else if (event.target.classList.contains('removeWatchlist')) {
    event.target.parentNode.parentNode.remove()
  }
})
})
  // let location = {}
  // let current = {}
  // $('makeApiCall').on('click', function (event) {
  //   event.preventDefault()
  //   $.getJSON("http://api.weatherapi.com/v1/current.json?key=ff4f207a8ae5485cb4320106200402&q=" + inputCity)
  //     .then(r => r.json())
  //     .then(({
  //       name,
  //       region,
  //       country,
  //       lat,
  //       lon,
  //       tz_id,
  //       localtime_epoch,
  //       localtime,
  //     }) => {
  //       location = {
  //         name: name,
  //         region: region,
  //         lat: lat,
  //         lon: lon,
  //         tz_id: tz_id,
  //         localtime_epoch: localtime_epoch,
  //         localtime: localtime,
  //       }
  //       $('movie').innerHTML = `
  //           <div class="card">
  //             <div class="card-image">
  //               <img src="${Poster}" alt="${name}">
  //               <span class="card-name">${name}</span>
  //             </div>
  //             <div class="card-content">
  //               <h4>Directed by ${Director}</h4>
  //               <h5>region: ${region}</h5>
  //               <p>${Plot}</p>
  //             </div>
  //             <div class="card-action">
  //               <button class="btn waves-effect waves-light addToCityCards">Add To Watchlist</button>
  //             </div>
  //           </div>
  //           `
  //       $('title').value = ''
  //     })
  //     .catch(e => console.error(e))

  //   // Store to localStorage
  //   localStorage.setItem('movie', JSON.stringify(movie));
  //   let list = JSON.parse(localStorage.getItem(movie.title)) || []
  // })

  // document.on('click', event => {
  //   if (event.target.classList.contains('addToCityCards')) {
  //     event.target.parentNode.parentNode.remove()
  //     let weatherElement = document.createElement('div')
  //     weatherElement.className = 'card'
  //     weatherElement.innerHTML = `
  //         <div class="card-content">
  //           <h3>${movie.title}</h3>
  //           <h4>Directed by ${movie.director}</h4>
  //           <h5>Year: ${movie.year}</h5>
  //           <p>${movie.plot}</p>
  //         </div>
  //         <div class="card-action">
  //           <button class="btn waves-effect waves-light removeWatchlist">Remove from Watchlist</button>
  //         </div>
  //         `
  //     $('watchlist').append(weatherElement)
  //   } else if (event.target.classList.contains('removeWatchlist')) {
  //   }
  //     event.target.parentNode.parentNode.remove()
  // })
// })