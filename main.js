

//global members
let data = []
let title = document.querySelectorAll('.title')
let img = document.querySelectorAll('.img1')
let maxTemp = document.querySelectorAll('.maxTemp')
let minTemp = document.querySelectorAll('.minTemp')
let condition = document.querySelectorAll('.condition')

// get api data
async function getData(city = "Alexandria") {
  let url = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=ff675aa63b5e4a3f99562410243006&q=${city}&days=3`)
  let response = await url.json();
  data = response;

}
// put first part data
function displayFirst(data = []) {
  let date = new Date();
  let monthNumber = date.getDate();
  let monthName = date.toLocaleString('en-us', { month: "short" })
  let dayName = date.toLocaleString('en-us', { weekday: "long" })
  day1.innerHTML = `${dayName}`;
  date1.innerHTML = `${monthNumber}${monthName}`;
  cityName1.innerHTML = data.location.name;
  temperature1.innerHTML = data.current.temp_c + ' &deg;C';
  icon1.setAttribute('src', data.current.condition.icon);
  status1.innerHTML = data.current.condition.text
  smallIcon1.innerHTML = '<img  src="https://routeweather.netlify.app/images/icon-umberella.png" alt=""> ' + data.current.humidity + ' %'
  smallIcon2.innerHTML = '<img  src="https://routeweather.netlify.app/images/icon-wind.png" alt=""> ' + data.current.wind_mph + ' m/h'
  smallIcon3.innerHTML = '<img  src="https://routeweather.netlify.app/images/icon-compass.png" alt=""> ' + data.current.wind_dir
}

//put next data
function next(nextdays) {

  let daysArray = nextdays.forecast.forecastday
  console.log(daysArray);
  for (let i = 0; i < daysArray.length; i++) {

    let date = new Date(daysArray[i + 1].date)
    let dayName = date.toLocaleString('en-us', { weekday: "long" })
    title[i].innerHTML = dayName
    img[i].setAttribute('src', daysArray[i + 1].day.condition.icon)
    // maxtemp_c
    maxTemp[i].innerHTML = daysArray[i + 1].day.maxtemp_c + ' &deg;C'
    minTemp[i].innerHTML = daysArray[i + 1].day.mintemp_c + ' &deg;C'
    // daysArray[i + 1].day.condition.text
    condition[i].innerHTML = daysArray[i + 1].day.condition.text
  }
}
//start app

async function startApp(city) {
  await getData(city)
  displayFirst(data)
  next(data)
}
startApp()

// invoke start function
let form = document.forms[0]
form.addEventListener('input', function (e) {
  e.preventDefault()
  let cityName = e.target.value
  if (cityName.length >= 3) {
    try {

      startApp(cityName);
    }
    catch (e) {

    }
  }
})







// async function addTodo() {
//   let request = await fetch('https://todos.routemisr.com/api/v1/todos', {
//     method: 'POST',
//     body: JSON.stringify({
//       "title": "Game Over 11111111111",
//       "apiKey": "6680cc5860a208ee1fdc1858"
//     }),
//     headers:{
//      "Content-Type":"application/json"
//     }
//   })
// let response=await request.json();

// console.log(request);
// }

// addTodo();



// http://api.weatherapi.com/v1/forecast.json?key=ff675aa63b5e4a3f99562410243006&q=07112&days=3
//http://api.weatherapi.com/v1/forecast.json?key=<YOUR_API_KEY>&q=07112&days=7
// async function getWeatherdata(city) {
//   let url= await fetch(`http://api.weatherapi.com/v1/forecast.json?key=ff675aa63b5e4a3f99562410243006&q=${city}&days=3`)
//   let response=await url.json()
//   console.log(response);
// }
// getWeatherdata('london')

/* animation jq
$(".container")
.animate({width:'100%'})
.animate({height:'100vh'},function () {
  $('p').slideDown(500,function () {
    $('.col-md-4').eq(0).slideDown(500,function () {
      $('.col-md-4').eq(1).slideDown(500,function () {
        $('.col-md-4').eq(2).slideDown(500)
      })
    })
  })
})
*/
//