

require("dotenv").config();
const {Rover, MarsRoverImage, Camera}= require('./DataTypes.js');
const apiKey = process.env.NASA_API_KEY || '';
const nasaBaseApi = process.env.NASA_API_BASE_URL || '';
const port = process.env.BACKEND_PORT || 3000;
const immutable = require("immutable"); //global
const {Map, Collection, fromJS, List} = require("immutable");
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const axios = require('axios');
const helmet = require('helmet');
const moment = require('moment')();
const compression = require('compression');
const cors = require("cors");
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));
app.use(cors());
app.use(compression());
app.use(helmet());

async function getData(url) {
    return await axios.get(url)
        .then(response => {
            if (response.status === 200) {
                return response.data;
            } else {
                console.error(response.status);
                return Promise.reject(response.status)
            }
        })
        .catch(error => {
            console.error(error);
            return Promise.reject(error)
        });

}

function generateMarsRoverUrl(q) {
    return `https://mars-photos.herokuapp.com/${q}`;
}
function generateNasaApiUrl(q) {
   return `${nasaBaseApi}/${q}?api_key=${apiKey}`;
}


app.get("/get-apod", async (req, res) => {
    const generateAPODUrl = generateNasaApiUrl("planetary/apod");
    const jsonData = await getData(generateAPODUrl).catch((e) => {
        console.log("get-apod error " + e);
        res.status(500).send()
    });

    if (jsonData) {
        const data = JSON.stringify(jsonData);
        res.status(200).send(data);
    } else {

        res.status(500).end();
    }

});
app.post("/get-latest-rover-photos", async (req, res)=> {
    console.log(req);
    const requestRover = req.body.rover;

    const url = generateNasaApiUrl(`mars-photos/api/v1/rovers/${requestRover.toString().toLowerCase()}/latest_photos`);

    const jsonData = await getData(url).catch((e) => {
        console.log("get-apod error " + e);
        res.status(500).send()
    });
    if (jsonData) {
        const roverData = Map(jsonData);
        // const cleanedObjectData = roverData.map((json) => {
        //     return new
        // });
        res.status(200).send(JSON.stringify(roverData));
    } else {
        res.status(500).end();
    }
});
app.listen(port);
console.log("Server listening on " + port);