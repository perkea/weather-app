$(function(){

    const BASE_URL  = "http://api.openweathermap.org/data/2.5/weather"
    const API_KEY = 'e3393d58f455dddae6c8ac63a07f379f';
    let weatherData;
    
    // Cached Element References
    //step 1 is always select the dom element first
    const city = $('#name'); // 
    const icon= $('#weather-icon');
    const weather = $('#weather');
    const temp = $("#temp");
    const description = $("#description");
    const form = $('form'); // 
    const input = $('input[type="text"]');

    let day = $("#date");
    let date = new Date();
    
    
   
    
  
    // event handler functions are passed an object containing data representing the event
    form.on('submit', handleGetData)
    
    
    // Functions
    function handleGetData(event) {
        // Set up a request to our api using Javascript
        event.preventDefault(); 
        // this method is used to turn off the default page refresh behavior
        const cityInput = input.val();
        input.val("");
        // $.ajax() returns a Promise object that is used to resolve the request
        // We call .then to register our success callback and our failure callback
        // one of the functions will be called based on the failure or success of our request
        // if successful the success callback will receive an object representing the resulting data
                $.ajax(`${BASE_URL}?q=${cityInput}&appid=${API_KEY}&units=metric`).then(function(data){
            
           weatherData = data;
           
           // data comes from our success callback once the data comes 
            render();
        }, function (error) {
            // the failure callback
            console.log(error);
        });
    }
    
    
    function render() {
        const iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
        day.html(date);
      
        city.html(weatherData.name);
        weather.html(weatherData.weather[0].main);
        description.html(weatherData.weather[0].description);
        temp.html(weatherData.main.temp);
        icon.attr("src", iconUrl);
    }

    
})

