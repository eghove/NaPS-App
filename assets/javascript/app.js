var ParkNames = [];

var npsSearch = "Colorado";
var npsURL = "https://developer.nps.gov/api/v1/parks?q=" + npsSearch + "&api_key=z3gukqYquzKbLQXkLJFI7OpTS88qyjCZV5DbjcHc";

$.ajax({
    url: npsURL,
    method: "GET"
}).then(function (response) {
    console.log(response);

    var ParkData = response.data;

    for (var j = 0; j < ParkData.length; j++) {
        
        ParkNames.push("https://developer.nps.gov/api/v1/campgrounds?q=" + ParkData[j].fullName + "&api_key=z3gukqYquzKbLQXkLJFI7OpTS88qyjCZV5DbjcHc");
    }

    camping();
});

console.log(ParkNames);

function camping() {
    console.log("hi");

    for(var i=0;i<ParkNames.length;i++) {
        
        $.ajax({
            url: ParkNames[i],
            method: "GET"
        }).then(function(response1) {
            console.log(response1);
        });
    };
};