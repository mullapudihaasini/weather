const APIKEY = "2bf297d22711a5fd5ed7c879ea5f7e04";

function loadData(){
    const city = cityName.value;

    errorMsg.innerHTML = "";
    weatherDetails.innerHTML = "";

    if(city == ""){
        errorMsg.innerHTML = "Enter city name";
        cityName.focus();
        return;
    }

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`;

    // alert(URL);

    fetch(URL)
        //Get Promise
        .then((response)=>{
            if(!response.ok) 
                throw new Error(response.statusText);
            return response.json();
        })
        //Handle response
        .then((data)=>{
            const {temp, humidity} = data.main;
            const icon = data.weather[0].icon;
            const cname = data.name;
            const condition = data.weather[0].description;
            const windspeed = data.wind.speed;
            weatherDetails.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@4x.png" alt="" />
                                        <div class="details">
                                            <h3>${cname}</h3>
                                            <h1>${temp}C</h1>
                                        </div>
                                        <div class="details">
                                            <p>Condition: ${condition}</p>
                                            <p>Humidity: ${humidity}</p>
                                            <p>Wind Speed: ${windspeed}</p>
                                        </div>
                                        `;
        })
        //Handle Error
        .catch((error)=>{
            errorMsg.innerHTML = error;
        });
}