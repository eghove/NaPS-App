// open weather API 






































































































function weatherQuery(latitude, longitude){
    // open weather api key

    var weatherAPIkey = 'e0517042c4c62f6d8cc8a258ba9ed1b4';

    // open weather base url

    var weatherBaseURL = "https://api.openweathermap.org/data/2.5/weather?"

    var latitudeParam = latitude;

    var longitudeParam = longitude;

    // setting up the query url
    var weatherQueryURL = weatherBaseURL + "lat=" + latitudeParam + "&lon=" + longitudeParam + "&appid=" + weatherAPIkey;
    console.log(weatherQueryURL);

    //   var currentweatherURL= "test";
    //   console.log(currentweatherURL);
    
//    $.ajax({
//        URL: weatherQueryURL,
//        method: "GET"
//      })
//      .then(function(response){
//          currentweatherURL = response.url;
//          console.log(currentweatherURL);

//      });
   
}