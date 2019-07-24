require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var fs = require("fs");

var spotify = new Spotify(keys.Spotify);
var moment = require('moment');

moment().format('MM/DD/YYYY');

var commands = ['concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says']
var inputCommand = process.argv[2];
var searchString = process.argv.slice(3).join(" ");

// console.log(inputCommand,inputName);
// console.log(spotify);
// console.log(searchString);

switch (inputCommand) {
    case 'concert-this':
        concertThis(searchString)
        break;
    case 'spotify-this-song':
        if (searchString) {
            spotifySong(searchString);
        } else {
            searchString = 'The Sign Ace of Base'
            spotifySong(searchString);
        }
        break;
    case 'movie-this':
        if (searchString) {
            movieInfo(searchString);
        } else {
            searchString = 'Mr. Nobody';
            movieInfo(searchString);
        }
        break;
    case 'do-what-it-says':
        doWhatItSayFunction();
        break;
    default:
        console.log("Unrecognize command");
}
// Concert of artist from bandsintown api
function concertThis(artistName) {
    axios.get("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp").
    then(function (response) {
        var data = response.data;
        // var newArr = [];

        for (var i = 0; i < data.length; i++) {
            var name = JSON.stringify(data[i].venue.name);
            var country = JSON.stringify(data[i].venue.country);
            var cdate = data[i].datetime;
            var dateFormated = moment(cdate).format('MM/DD/YYYY');

            var newData = "";
            newData = newData + "Name: ";
            newData = newData + name + "\n";
            newData = newData + "Country: ";
            newData = newData + country + "\n";
            newData = newData + "Date: ";
            newData = newData + dateFormated + "\n";
            newData += "\n";
            newData += "\n";
            // console.log(newData);


            fs.appendFileSync("log.txt", newData,function(err){
                if(err){
                    console.log("Error in  writing file : "+ err);
                }
            })
        }

        for (var i = 0; i < data.length; i++) {
            var concertDate = data[i].datetime;
            var venueName = data[i].venue.name;
            var concertCuntry = data[i].venue.country;

            console.log("Venue :" + venueName);
            console.log("Location :" + concertCuntry);
            console.log("Date :" + moment(concertDate).format('MM/DD/YYYY'));
            console.log("\n");

        }
    })
    .catch(function(error){
      console.log("Error in fatching data : " + error);  
    })
}
// For spotify song
function spotifySong(searchString) {

    spotify.search({
        type: 'track',
        query: searchString
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        for (var i = 0; i < data.tracks.items.length; i++) {
            // console.log(data.tracks.items[i]);
            // console.log(JSON.stringify(data.tracks.items[i],null,5));
            var songInfo = data.tracks.items[i];
            console.log("Atrist Name : " + songInfo.artists[0].name);
            console.log("Song Name  : " + songInfo.name)
            console.log("Album : " + songInfo.album.name);
            console.log("Preview Song  " + songInfo.preview_url + "\n")
        }

        for (var i = 0; i < data.tracks.items.length; i++) {

            var songInfo = data.tracks.items[i];
            var newData = '';
            newData = newData + "Atrist(s) Name : " + songInfo.artists[0].name + "\n";
            newData = newData + "Song Name : " + songInfo.name + "\n";
            newData = newData + "Album : " + songInfo.album.name + "\n";
            newData = newData + "Preview Song : " + songInfo.preview_url + "\n\n";
            // console.log(newData);
            // console.log("done")
            fs.appendFileSync("log.txt", newData)
        }

    });
}
// movieInfo from omdb api
function movieInfo(movieName) {
    axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy")
        .then(
            function (response) {
                var result = response.data;
                console.log("\nTitle : " + result.Title);
                console.log("Release Year : " + result.Released)
                console.log("IMDB Rating : " + result.imdbRating)
                console.log("Rotten Tomatoes Rating : " + result.Ratings[1].Value)
                console.log("Country : " + result.Country)
                console.log("Language : " + result.Language)
                console.log("Plot : " + result.Plot)
                console.log("Actors : " + result.Actors)

                var movieString = '';
                movieString = movieString + "Title : " + result.Title + "\n";
                movieString = movieString + "Release Year : " + result.Released + "\n";
                movieString = movieString + "IMDB Rating : " + result.imdbRating + "\n";
                movieString = movieString + "Rotten Tomatoes Rating : " + result.Ratings[1].Value + "\n";
                movieString = movieString + "Country : " + result.Country + "\n";
                movieString = movieString + "Language : " + result.Language + "\n";
                movieString = movieString + "Plot : " + result.Plot + "\n";
                movieString = movieString + "Actors : " + result.Actors + "\n";

                fs.appendFileSync('log.txt', movieString);
            })
        .catch(function (error) {
            if (error) {
                console.log("Error in info movie : " + error);
            }
        })
}
// Do what it say function
function doWhatItSayFunction() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }
        console.log(data);
        var dataArr = data.split(",");
        // console.log(dataArr);

        if (dataArr[0] === 'spotify-this-song') {
            spotifySong(dataArr[1]);
            // console.log("done from do what spotify");
        } else if (dataArr[0] === 'movie-this') {
            movieInfo(dataArr[1]);
            // console.log("done from do what Movie");
        }

    });
}