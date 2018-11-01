var ParkNames = [];

var npsSearch = "Colorado";
var npsURL = "http://developer.nps.gov/api/v1/parks?q=" + npsSearch + "&api_key=z3gukqYquzKbLQXkLJFI7OpTS88qyjCZV5DbjcHc";

$.ajax({
    url: npsURL,
    method: "GET"
}).then(function (response) {
    console.log(response);

    var ParkData = response.data;

    for (var j = 0; j < ParkData.length; j++) {
        
        ParkNames.push("http://developer.nps.gov/api/v1/campgrounds?q=" + ParkData[j].fullName + "&api_key=z3gukqYquzKbLQXkLJFI7OpTS88qyjCZV5DbjcHc");
    }

    camping();
});

console.log(ParkNames);

function camping() {
    console.log("hi");

    for(var i=0;i<ParkNames.length;i++) {
        
        $.ajax({
            url: ParkNames[1],
            method: "GET"
        }).then(function(response1) {
            console.log(response1);
        });
    };
};







































//basic NASA Satellinte Imagery API QUERY FUNCTION
function NASAQuery (longitude, latitude) {
    //NASA API Key
    const NASAAPIKey='z3gukqYquzKbLQXkLJFI7OpTS88qyjCZV5DbjcHc';
    //base NASA Imagery API
    const NASABaseURL = 'https://api.nasa.gov/planetary/earth/imagery?';
    let longitudeParam = longitude;
    let latitudeParam = latitude;
    //setting up the query url
    let NASAQueryURL = NASABaseURL + 'lon=' + longitudeParam + '&lat=' + latitudeParam + '&api_key=' + NASAAPIKey ;
    //console.log(NASAQueryURL);
    let NASAImageURL='';
    //the ajax call
    $.ajax({
        url: NASAQueryURL,
        method: "GET"
      })
      .then(function(response) {
          NASAImageURL = response.url;
          console.log(NASAImageURL);
      });
};

