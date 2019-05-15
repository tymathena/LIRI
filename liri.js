
const axios = require("axios");
const dotenv = require("dotenv");
const moment = require("moment");
const Spotify = require("node-spotify-api");
const inquirer = require("inquirer");

let spotify = new Spotify({

    id: "dca14f5d001d4b209859f2c872273e83",
    secret: "abbf49ae61124ab3a7331c48990cb2a9"

})

function init () {

    const divider = "\n==========================================\n\n"

    inquirer.prompt([
        {
            type: "list",
            message: "Hello, what would you like to search?",
            choices: ["Music", "Movies", "Bands"],
            name: "category"
        },
        {
            type: "input",
            message: "Make your search",
            name: "query"
        },
        {
            type: "input",
            message: "How many results do you want to see?",
            name: "num",
            validate: function (answer) {

                if (parseInt(answer)) {
                    return true;
                }
                return false
            }
        },


    ]).then(function (response) {

        let URL;

        const num = response.num;

        if (response.category === "Music") {

            console.log("\n\n");
            
            spotify.search({type: "track", query: response.query}).then(function (response) {

                const songs = response.tracks.items;

                for(let i = 0; i < num && i < songs.length; i++) {

                    //console.log(JSON.stringify(songs[i], null, 2))

                    console.log(`Name: ${songs[i]["name"]}
Artists: ${songs[i]["artists"][0]["name"]}
Album: ${songs[i]["album"]["name"]}`);

                    console.log(divider);
                    
                }

            }).catch(function (e) {
                console.log(e);
            })

        } else if (response.category === "Movies") {

            URL = "http://www.omdbapi.com/?apikey=94f572e2&s=" + response.query

            axios.get(URL).then(function (response) {

                //console.log(JSON.stringify(response.data, null, 2))

                const movies = response.data.Search

                //console.log(movies)

                for(let i = 0; i < num && i < movies.length; i++) {

                    //console.log(JSON.stringify(songs[i], null, 2))

                    console.log(`Name: ${movies[i]["Title"]}
Year: ${movies[i]["Year"]}`);

                    console.log(divider);

                }

            }).catch(function (e) {
                console.log(e);
            })

        } else {

            console.log("\n\n");
            
            spotify.search({type: "artist", query: response.query}).then(function (response) {

                const songs = response.artists.items;

                for(let i = 0; i < num && i < songs.length; i++) {

                    //console.log(JSON.stringify(songs[i], null, 2))

                    console.log(`Name: ${songs[i]["name"]}
Genres: ${songs[i]["genres"].join(", ")}`);

                    console.log(divider);
                    
                }

            }).catch(function (e) {
                console.log(e);
            })

        }

    })
}

init();