require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var spell = process.argv[2];
var name = process.argv[3];

if (spell === 'concert-this') {
    concertThis();
} else if (spell === 'spotify-this-song') {
    spotifyThisSong();
} else if (spell === 'movie-this') {
    movieThis();
} else if (spell === 'do-what-it-says') {
    doWhatItSays();
}

function concertThis() {
    var artist = name;
    var query = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(query)
    .then(function (response) {
        // handle success
        console.log("-------------------------");
        console.log( "Name of the venue : " + response.data[0].venue.name);
        console.log("Venue location : " + response.data[0].venue.region + ", " + response.data[0].venue.city);
        console.log("Date of the Event : " + response.data[0].datetime);
      })
      .catch(function(err) {
        console.log("Error : " + err)
      })
}

function spotifyThisSong() {

    var song = name;
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      console.log("-------------------------");
      console.log("Artist : " + data.tracks.items[0].artists[0].name); 
      console.log("The Song's name : " + data.tracks.items[0].name);
      console.log("A preview link : " + data.tracks.items[0].preview_url);
      console.log("The album : " + data.tracks.items[0].album.name);
      });

}

function movieThis() {

}

function doWhatItSays() {

}

