






































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

