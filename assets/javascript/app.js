//GLOBAL VARIABLES
//===============================================================
var ParkNames = [];

var npsSearch = "Colorado";
var npsURL = "http://developer.nps.gov/api/v1/parks?q=" + npsSearch + "&api_key=z3gukqYquzKbLQXkLJFI7OpTS88qyjCZV5DbjcHc";

//array that captures the latitude and longitude of each NPS returned from the initial NPS ajax call
let latLongParkData = [];

//array that will capture the imagre URLs from NASA for the park results page
let NASAImages = [];

//FUNCTIONS
//===============================================================
$.ajax({
    url: npsURL,
    method: "GET"
}).then(function (response) {
    console.log(response);

    var ParkData = response.data;

    for (var j = 0; j < ParkData.length; j++) {
        
        ParkNames.push("http://developer.nps.gov/api/v1/campgrounds?q=" + ParkData[j].fullName + "&api_key=z3gukqYquzKbLQXkLJFI7OpTS88qyjCZV5DbjcHc");

        //push the latitude and longitude string from the above response into latLongParkData array
        latLongParkData.push(ParkData[j].latLong);
    }
    //calls the function that parses the latitude and longitude into something the other APIs can use
    latLongParser();
    //push the NASA images to NASA Images Array
    NASAImagePush();
    camping();
});

//console.log(ParkNames);
console.log(latLongParkData);

function camping() {
    console.log("hi");

    for(var i=0;i<ParkNames.length;i++) {
        
        $.ajax({
            url: ParkNames[1], //should this be [i] instead of [1]?
            method: "GET"
        }).then(function(response1) {
            //console.log(response1);
        });
    };
};






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

//basic NASA Satellinte Imagery API QUERY FUNCTION
function NASAQuery (latitude, longitude) {
    //NASA API Key
    const NASAAPIKey='z3gukqYquzKbLQXkLJFI7OpTS88qyjCZV5DbjcHc';
    //base NASA Imagery API
    const NASABaseURL = 'https://api.nasa.gov/planetary/earth/imagery?';
    let longitudeParam = longitude;
    let latitudeParam = latitude;
    //setting up the query url
    let NASAQueryURL = NASABaseURL + 'lon=' + longitudeParam + '&lat=' + latitudeParam + '&api_key=' + NASAAPIKey ;
    //console.log(NASAQueryURL);
    //the ajax call
    $.ajax({
        url: NASAQueryURL,
        method: "GET"
      })
      .then(function(response) {
          //sets the url for the image to NASAImageURL variables
          let NASAImageURL = response.url;
          //push the url for the image to the NASAImages array
          NASAImages.push(NASAImageURL);
      });
};

//latitute, longitude parser
//takes the latitude and longitude from the NPS API and turns it into a value the other APIs can use
function latLongParser() {
    for (var k=0; k < latLongParkData.length; k++ ) {
        //set a itemToConvert to the latitude longitude string
        let itemToConvert = latLongParkData[k];
        //remove "lat:" from itemToConvert
        itemToConvert = itemToConvert.replace("lat:","");
        //remove " long:" from itemToConvert (there is a space before 'long')
        itemToConvert = itemToConvert.replace(" long:","");
        //turn the itemToConvert string to an array of 2 items
        itemToConvert = itemToConvert.split(",");
        //for loop that turns itemToConvert to values NASA API and OpenWeather API can use
        for (var l=0; l < itemToConvert.length; l++) {
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

function NASAImagePush () {
    for (let m=0; m < latLongParkData.length; m++) {
        NASAQuery(latLongParkData[m][0], latLongParkData[m][1]);
    }
    console.log(NASAImages);
}
 //MAIN PROCESSES
 //===============================================================

 
 