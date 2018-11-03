//GLOBAL VARIABLES
//===============================================================
// url array for campsite info
var campURL = [];

var npsSearch;
var npsURL;
var nasalat;
var nasalon;
var z = 0;

//array that captures the latitude and longitude of each NPS returned from the initial NPS ajax call
let latLongParkData = [];

//array that will capture the imagre URLs from NASA for the park results page
let NASAImages = [];

// array that will capture the Park Names
var ParkNames = [];

// array that will capture the park description
var ParkDescription = [];

// this will be an array that will hold campsite objects for each park in order.
var campsiteObjects = [];

//EVENT LISTENERS
// ==============================================================
$(document).ready(function () {
    $("#Search").on("click", function (event) {
        event.preventDefault();

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
        // camping();



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
            campsiteObjects.push(response.data);
            console.log(campsiteObjects)
            for (var r; r < campsiteObjects[i].length; r++) {
                // if (campsiteObjects[q].length == 0) {
                //     return false;
                // }
                console.log(campsiteObjects[i][r])

                var campsiteNames = $("<p>");

                campsiteNames.append(campsiteObjects[i][r].name);

                $("#well4").append(campsiteNames);

                console.log(campsiteNames);
            }
        });
    };

    // for (var q = 0; q < campsiteObjects.length; q++) {

    // }
};






function weatherQuery(latitude, longitude) {
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
    
            $("#well3").append(imageWell);
            console.log(imageWell)

            z++
            
        })
        .fail(function(error) {

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
 //MAIN PROCESSES
 //===============================================================


