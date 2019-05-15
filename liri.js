
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

        }

    })
}

init();