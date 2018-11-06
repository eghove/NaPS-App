//GLOBAL VARIABLES
//===============================================================
// url array for campsite info
var campURL = [];

var npsSearch;
var npsURL;
var nasalat;
var nasalon;
var z = 0;
var b = 0;
var weatherlat;
var weatherlon;

//array that captures the latitude and longitude of each NPS returned from the initial NPS ajax call
let latLongParkData = [];

//array that will capture the imagre URLs from NASA for the park results page
let NASAImages = [];

// array that will capture the Park Names
var ParkNames = [];

// array that will capture the park description
var ParkDescription = [];

// this will be an array that will hold campsite objects for each park in order.
var CampsiteLocations = [];
var CampsiteNames = [];
var CampsiteDescription = [];
var CampsiteDirections = [];
var CampsiteWeather = [];
var CampsiteWater = [];
var CampsiteToilets = [];
var CampsiteShowers = [];

var WeatherTemperature = [];
var WeatherWind = [];
var WeatherHumidity = [];
var WeatherDescription = [];


//EVENT LISTENERS
// ==============================================================
$(document).ready(function () {
    //checks to see if the user is authenticated
    authUserCheck();
    //on click listener for the logout button
    $('#Logout').on("click", function() {
        logOut();
    });
    $("#Search").on("click", function (event) {
        event.preventDefault();

        campURL = [];

        npsSearch = "";
        npsURL = [];
        nasalat = [];
        nasalon = [];
        z = 0;
        b = 0;
        weatherlat = [];
        weatherlon = [];

        latLongParkData = [];

        NASAImages = [];

        ParkNames = [];
        ParkDescription = [];

        CampsiteLocations = [];
        CampsiteNames = [];
        CampsiteDescription = [];
        CampsiteDirections = [];
        CampsiteWeather = [];
        CampsiteWater = [];
        CampsiteToilets = [];
        CampsiteShowers = [];

        WeatherTemperature = [];
        WeatherWind = [];
        WeatherHumidity = [];
        WeatherDescription = [];

        $("#well1").empty();
        $("#well2").empty();
        $("#well3").empty();
        $("#well4").empty();
        $("#well5").empty();

        Search()

    })
});

//FUNCTIONS
//===============================================================


// this function will tell all of the ajax what information to look up and will also reset the arrays each time it runs.
function Search() {
    // this will catch the url for the campsites that will be passed into the campground ajax.
    // campURL = [];

    // this will pick up the text from the input box
    npsSearch = $("#searchBox").val();
    npsURL = "https://developer.nps.gov/api/v1/parks?q=" + npsSearch + "&api_key=z3gukqYquzKbLQXkLJFI7OpTS88qyjCZV5DbjcHc";
    console.log(npsURL);



    // initial ajax to the nps
    $.ajax({
        url: npsURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // data retrieved from the park api
        var ParkData = response.data;
        // for loop to gather all relevant peices of info from the api and store them in arrays 
        for (var j = 0; j < ParkData.length; j++) {
            // campsite url, park names, and descriptions array push is done here
            campURL.push("https://developer.nps.gov/api/v1/campgrounds?q=" + ParkData[j].fullName + "&api_key=z3gukqYquzKbLQXkLJFI7OpTS88qyjCZV5DbjcHc");
            ParkNames.push(ParkData[j].fullName);
            ParkDescription.push(ParkData[j].description);

            //push the latitude and longitude string from the above response into latLongParkData array
            latLongParkData.push(ParkData[j].latLong);

            // this will be used as the DOM storage to be appended to the html
            var parkNameWell = $("<h2>");
            // first storing name of park
            parkNameWell.append(ParkData[j].fullName);
            // second well for description
            var descriptionWell = $("<h4>");
            // then storing the description of the park
            descriptionWell.append(ParkData[j].description);



            // append them to the html
            $("#well1").append(parkNameWell);
            $("#well2").append(descriptionWell);



        }
        //calls the function that parses the latitude and longitude into something the other APIs can use
        latLongParser();
        //push the NASA images to NASA Images Array
        NASAImagePush();
        camping();
        WeatherInfoPush();



    });

    //console.log(ParkNames);
    console.log(latLongParkData);

};

// function print() {
//     for (var q = 0; q < NASAImages.length; q++) {

//         // third well for images

//     }

// }

function camping() {
    console.log("hi");

    for (var i = 0; i < campURL.length; i++) {

        $.ajax({
            url: campURL[i],
            method: "GET"
        }).then(function (response) {
            var campData = response.data;
            console.log(campData);



            for (var c = 0; c < campData.length; c++) {
                CampsiteNames.push(campData[c].name);
                CampsiteDescription.push(campData[c].description);
                CampsiteDirections.push(campData[c].directionsUrl);
                CampsiteWeather.push(campData[c].weatherOverview);
                CampsiteWater.push(campData[c].amenities.potableWater[0]);
                CampsiteToilets.push(campData[c].amenities.toilets[0]);
                CampsiteShowers.push(campData[c].amenities.showers[0]);
                console.log(CampsiteNames);


                for (var v = 0; v < CampsiteNames.length; v++) {
                    var campsiteNameWell = $("<h4>");

                    campsiteNameWell.append(CampsiteNames[v]);

                    var campsiteInfoWell = $("<p>");

                    campsiteInfoWell.append("<br><br>" + "Description : " + CampsiteDescription[v])

                    campsiteInfoWell.append("<br><br>" + "<a href=" + CampsiteDirections[v] + ">" + "Directions" + "</a>");

                    campsiteInfoWell.append("<br><br>" + "Weather Overview : " + CampsiteWeather[v]);

                    campsiteInfoWell.append("<br><br>" + "Potable Water : " + CampsiteWater[v]);

                    campsiteInfoWell.append("<br><br>" + "Toilets : " + CampsiteToilets[v]);

                    campsiteInfoWell.append("<br><br>" + "Showers : " + CampsiteShowers[v]);

                    $("#well4").append(campsiteNameWell);
                    $("#well4").append(campsiteInfoWell);


                }
                CampsiteNames = [];
                CampsiteDescription = [];
                CampsiteDirections = [];
                CampsiteWeather = [];
                CampsiteWater = [];
                CampsiteToilets = [];
                CampsiteShowers = [];
            }
        });
    };

    // for (var q = 0; q < campsiteObjects.length; q++) {

    // }
};





//weather Quaery API
function weatherQuery(latitude, longitude) {
    // open weather api key

    var weatherAPIkey = 'e0517042c4c62f6d8cc8a258ba9ed1b4';

    // open weather base url

    var weatherBaseURL = "https://api.openweathermap.org/data/2.5/weather?"

    let weatherLatitudeParam = latitude;

    let weatherLongtudeParam = longitude;

    // setting up the query url
    var weatherQueryURL = weatherBaseURL + "lat=" + weatherLatitudeParam + "&lon=" + weatherLongtudeParam + "&appid=" + weatherAPIkey;
    console.log(weatherQueryURL);

    //the Ajax call
    $.ajax({
        url: weatherQueryURL,
        method: "GET"
    })
        .then(function (response) {
            //capture the temperature, convert it to F
            var temperature = (response.main.temp - 273.15) * 1.80 + 32;
            var temperature = temperature.toFixed(2);

            WeatherTemperature.push(temperature);

            //capture the windspeed
            var windspeed = response.wind.speed;

            WeatherWind.push(windspeed);

            //capture the humidity
            var humidity = response.main.humidity;

            WeatherHumidity.push(humidity);

            //weather description
            var weatherDescrip = "";
            weatherDescrip = response.weather[0].description;

            WeatherDescription.push(weatherDescrip);

            console.log(temperature);
            console.log(windspeed);
            console.log(humidity);
            console.log(weatherDescrip);

            var WeatherWell = $("<p>");

            WeatherWell.append("<br><br> Temperature : " + WeatherTemperature[b] + "F");

            WeatherWell.append("<br><br> Wind Speed : " + WeatherWind[b] + "mph");

            WeatherWell.append("<br><br> Humidity : " + WeatherHumidity[b] + "%");

            WeatherWell.append("<br><br> Weather Description : " + WeatherDescription[b]);

            $("#well5").append(WeatherWell);

            b++;

            //console.log(temperature + " " + windspeed + " " + humidity + " " + weatherDescrip);
        })
}

//basic NASA Satellinte Imagery API QUERY FUNCTION
function NASAQuery(latitude, longitude) {
    //NASA API Key
    const NASAAPIKey = 'z3gukqYquzKbLQXkLJFI7OpTS88qyjCZV5DbjcHc';
    //base NASA Imagery API
    const NASABaseURL = 'https://api.nasa.gov/planetary/earth/imagery?';
    let longitudeParam = longitude;
    let latitudeParam = latitude;
    //setting up the query url
    let NASAQueryURL = NASABaseURL + 'lon=' + longitudeParam + '&lat=' + latitudeParam + '&api_key=' + NASAAPIKey;
    //console.log(NASAQueryURL);
    //the ajax call
    $.ajax({
        url: NASAQueryURL,
        method: "GET"
    })
        .then(function (response) {
            //sets the url for the image to NASAImageURL variables
            let NASAImageURL = response.url;
            //push the url for the image to the NASAImages array
            NASAImages.push(NASAImageURL);

            var imageWell = $("<div>");
            // throw in the src for the nasa images
            imageWell.html("<img src=" + NASAImages[z] + ">");
            //used this console to make sure real images and fail images are showing up in the rigth places
            //console.log("position in Nasa Images Array: " + z + " " + NASAImages[z] );

            $("#well3").append(imageWell);
            //console.log(imageWell);

            z++;

        })
        .fail(function (error) {
            //set up default image
            let defaultImageUrl= 'https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image';
            //push the link to the default image to NASAImages array
            NASAImages.push(defaultImageUrl);

            //copied this code from the .then function above.
            var imageWell = $("<div>");
            // throw in the src for the nasa images
            imageWell.html("<img src=" + NASAImages[z] + ">");
            //used this console to make sure real images and fail images are showing up in the rigth places
            //console.log("position in Nasa Images Array: " + z + " " + NASAImages[z] );

            $("#well3").append(imageWell);
            //console.log(imageWell);

            z++;
        });
};

//latitute, longitude parser
//takes the latitude and longitude from the NPS API and turns it into a value the other APIs can use
function latLongParser() {
    for (var k = 0; k < latLongParkData.length; k++) {
        //set a itemToConvert to the latitude longitude string
        let itemToConvert = latLongParkData[k];
        //remove "lat:" from itemToConvert
        itemToConvert = itemToConvert.replace("lat:", "");
        //remove " long:" from itemToConvert (there is a space before 'long')
        itemToConvert = itemToConvert.replace(" long:", "");
        //turn the itemToConvert string to an array of 2 items
        itemToConvert = itemToConvert.split(",");
        //for loop that turns itemToConvert to values NASA API and OpenWeather API can use
        for (var l = 0; l < itemToConvert.length; l++) {
            //set latitude or longitude to the variable value
            let value = itemToConvert[l];
            //transform the string to a floating point decimal
            value = parseFloat(value);
            //transform the fp decimal above to a string with two decimals
            value = value.toFixed(2);
            //put the new converted value back into itemToConvert array
            itemToConvert[l] = value;
        }
        //replaces the items in the original latLongParkData array with the converted strings
        latLongParkData[k] = itemToConvert;
    }
};

function NASAImagePush() {
    for (let m = 0; m < latLongParkData.length; m++) {
        nasalat = latLongParkData[m][0];
        nasalon = latLongParkData[m][1]
        NASAQuery(nasalat, nasalon);

    }

    console.log(nasalat)
    console.log(nasalon)
    console.log(NASAImages);
}

//the function that will re-direct the user back to the login page if an account has not yet been created (self-invoking)
function authUserCheck() {
    var firebase = app_fireBase;
    var uid=null;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          uid = user.uid;
        } else {
            //redirect to login page
            uid = null;
            window.location.replace("login.html");
        }
      });

      
};
//logs the user out
function logOut () {
    firebase.auth().signOut();
};

function WeatherInfoPush() {
    for (let p = 0; p < latLongParkData.length; p++) {
        weatherlat = latLongParkData[p][0];
        weatherlon = latLongParkData[p][1]
        weatherQuery(weatherlat, weatherlon);

    }

    console.log(nasalat)
    console.log(nasalon)
    console.log(NASAImages);
};
 //MAIN PROCESSES
 //===============================================================


