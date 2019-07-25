# liri-node-app

Liri node app is a node cli programme. It's like Siri. Instead of taking command verbally it takes command from user input.

## How it works.
* It takes four commads as input. Each has different output.
    1. concert-this ArtistName
        * This command will print the upcoming event of the artist.
    2. movie-this MovieName
        * This will give the information of Movie.
    3. spotify-this-song songlines
        * This command will print that particular song from all the albums it belongs and its artist and it's url.
    4. do-what-it-says
        * This command will take its input command stored in random.txt file and generate output according to that command.

## FlowChart of the programme:

    ![FlowChart](https://github.com/HET1905/liri-node-app/blob/master/images/FlowChart.jpg "FlowChart of the app")

## GIF images for the commands and its output.

1. concert-this

    * ![Concert-this](https://github.com/HET1905/liri-node-app/blob/master/images/concert-this.gif "concert-this1")

    * ![Concert-this](https://github.com/HET1905/liri-node-app/blob/master/images/concert-this2.gif "concert-this2")

2. do-what-it-says

    * ![do-what-it-says1](https://github.com/HET1905/liri-node-app/blob/master/images/do-what-it-says1.gif "do-what-it-says1")

    * ![do-what-it-says2](https://github.com/HET1905/liri-node-app/blob/master/images/do-what-it-says2.gif "do-what-it-says2")

3. movie-this

    * ![movie-this](https://github.com/HET1905/liri-node-app/blob/master/images/movie-this1.gif "movie-this")

4. spotify-this-song

    * ![spotify-this-song](https://github.com/HET1905/liri-node-app/blob/master/images/spofity-this-song.gif "spotify-this-song")


### API used:

* BandsInTown Api
* OMDB Api

### Node packages:

* node-spotify-api
* axios
* dotenv
* moment


## License
Designed and developed by Hetal Patel

MIT © [Hetal Patel]()

