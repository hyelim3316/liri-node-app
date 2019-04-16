require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

var spell = process.argv[2];
var name = process.argv[3];

if (spell === 'concert-this') {
    concertThis(name);
} else if (spell === 'spotify-this-song') {
    spotifyThisSong(name);
} else if (spell === 'movie-this') {
    movieThis(name);
} else if (spell === 'do-what-it-says') {
    doWhatItSays(name);
}



function concertThis() {
    var artist = name;
    var query = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";


    axios.get(query)
    .then(function (response) {
        var date = moment(response.data[0].datetime).format("MM[/]DD[/]YYYY");
        // handle success
        console.log("-------------------------");
        console.log( "Name of the venue : " + response.data[0].venue.name);
        console.log("Venue location : " + response.data[0].venue.region + ", " + response.data[0].venue.city);
        console.log("Date of the Event : " + date);
        console.log("-------------------------");

      })
      .catch(function(err) {
        console.log("Error : " + err)
      })
}

function spotifyThisSong(name) {

    var song = name;
    if (!song) {
        song = 'The Sign';
    }

    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      console.log("-------------------------");
      console.log("Artist : " + data.tracks.items[0].artists[0].name); 
      console.log("The Song's name : " + data.tracks.items[0].name);
      console.log("A preview link : " + data.tracks.items[0].preview_url);
      console.log("The album : " + data.tracks.items[0].album.name);
      console.log("-------------------------");  
    });
        
}

function movieThis(name) {

    var movie = name;
    
    if (!movie) {
        movie = 'Mr.Nobody';
    }
    
    var query = "http://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";    var query = "http://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

    axios.get(query)
    .then(function (response) {
        console.log("--------------------");
        console.log("Title : " + response.data.Title);
        console.log("Year : " + response.data.Year);
        console.log("IMDB Rating : " + response.data.Rated);
        console.log("Rotten Tomatoes Rating : " + response.data.Ratings[1].Value);
        console.log("Contry : " + response.data.Country);
        console.log("Language : " + response.data.Language);
        console.log("Plot : " + response.data.Plot);
        console.log("Actors : " + response.data.Actors);
        console.log("--------------------");
    })
    .catch(function(err){

    })
}

function doWhatItSays() {

    fs.readFile('random.txt','utf8', (err, data) => {
        if (err) throw err;

        var spell = data.split(",")[0]
        var name = data.split(",")[1]
        if (spell === 'concert-this') {
            concertThis(name);
        } else if (spell === 'spotify-this-song') {
            spotifyThisSong(name);
        } else if (spell === 'movie-this') {
            movieThis(name);
        } else if (spell === 'do-what-it-says') {
            doWhatItSays(name);
        }
        console.log(data.split(",")[0]);
});
}

