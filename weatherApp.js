const searchInput = document.querySelector('.search-input');
const currentWeatherDiv = document.querySelector('.current-weather');
const hourlyWeatherData = document.querySelector('.hourly-weather .weather-list');


const API_KEY = `900ca76c352a4285abb101924252701`;

const  displayHourlyData= (hourlydata) =>{

    // filter the data to only include the next 24 hours
    const next24HoursData = hourlydata.filter(({time})=>{
        const forecastTime = new Date(time).getTime();
        return forecastTime >= Date.now() && forecastTime <= Date.now() + 24 * 60 * 60 * 1000;
    });

    hourlyWeatherData.innerHTML= next24HoursData.map(item => { 
        const temperature =Math.floor( item.temp_c);
        const time =item.time.split(" ")[1].substring(0,5);
        const weatherIcon = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(item.condition.code));

        return `  <li class="weather-item">
                        <p class="time">${time}</p>
                        <img src="/pictures/${weatherIcon}.svg" alt="" class="weather-icon">
                        <p class="temperature">${temperature}<span> °C </span></p>
                    </li>`

        
    }).join(" ");
    console.log(HourlydataHtml);
    

}

const weatherCodes = {
    clear: [1000], // Sunny / Clear
    clouds: [1003, 1006, 1009], // Partly Cloudy, Cloudy, Overcast
    mist: [1030, 1135, 1147], // Mist, Fog, Freezing Fog
    rain: [
      1063, 1150, 1153, 1168, 1180, 1183, 1186, 1189, 1192, 1195,
      1198, 1201, 1240, 1243, 1246, 1069, 1072  // Add more rain codes
    ], // Light, Patchy Rain and Showers
    moderate_heavy_rain: [1192, 1195, 1243, 1246], // Moderate or Heavy Rain
    snow: [
      1066, 1069, 1072, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 
      1237, 1255, 1258, 1261, 1264
    ], // Light, Moderate, or Heavy Snow
    thunder: [1273, 1279, 1087, 1276, 1282], // Thunder without rain
    thunder_rain: [1087, 1276, 1282] // Thunder with rain or snow
 };
 
  

const getWeatherDetails =  async (cityName)=>{
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=2`;

    try{
        const response = await fetch(API_URL);
        const data = await response.json();


        // EXTRACT WETHEAR DETAILS  
        const temperature =Math.floor( data.current.temp_c);
        const description = data.current.condition.text;
        const weatherIcon = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(data.current.condition.code)) || "default";

         

        //UPdate to the website the current weather
        currentWeatherDiv.querySelector('.weather-icon').src = `/pictures/${weatherIcon}.svg`;

        currentWeatherDiv.querySelector('.temperature').innerHTML =`${temperature}<span> °C </span></h2>`;

        currentWeatherDiv.querySelector('.description').innerText = description;

        // Hourlydata
        // combining today and tomorrow data
    
        const combinedHourlyData = [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour];

        displayHourlyData(combinedHourlyData);
        
    }catch(error){
        console.log(error);
    }
}

searchInput.addEventListener('keydown',(e)=>{
    const cityName = searchInput.value.trim();

    //ENter key button to search for city name

    if(e.key=== "Enter" && cityName){
    getWeatherDetails(cityName);        
    }

});