require("dotenv").config();
const port = process.env.BACKEND_PORT || 3000;
const utils = require("./utils");

const {List} = require("immutable");
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const helmet = require('helmet');
const moment = require('moment')();
const compression = require('compression');
const cors = require("cors");
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
const rootPath  = __dirname.replace(`${path.sep}server`,"");
console.log(rootPath);
app.use(express.static(path.join(rootPath, 'public')));
app.use(cors());
app.use(compression());
app.use(helmet());




app.get("/get-apod", async (req, res) => {
    const generateAPODUrl = utils.generateNasaApiUrl("planetary/apod");
    const jsonData = await utils.getData(generateAPODUrl).catch((e) => {
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
app.post("/get-latest-rover-photos", async (req, res) => {
    const requestRover = req.body.rover;
    const url = utils.generateNasaApiUrl(`mars-photos/api/v1/rovers/${requestRover.toString().toLowerCase()}/latest_photos`);

    const jsonData = await utils.getData(url).catch((e) => {
        console.log("get-apod error " + e);
        res.status(500).send()
    });

    if (jsonData) {
        let roverData = List(jsonData.latest_photos);
        roverData = roverData.sort((a, b) => {
            const c1 = a.camera.name;
            const c2 = b.camera.name;
            return (c1 === c2) ? 1 : -1;
        });
        roverData = roverData.sort((a, b) => {
            const d1 = Date.parse(a.earth_date);
            const d2 = Date.parse(b.earth_date);
            return (d1 < d2) ? 1 : -1;
        });
        res.status(200).send(JSON.stringify(roverData));
    } else {
        res.status(500).end();
    }
});

app.post("/get-camera-photos", async (req, res) => {
    const requestRover = req.body.rover;
    const requestCamera = req.body.camera;

    const url = utils.generateNasaApiUrl(`mars-photos/api/v1/rovers/${requestRover.toString().toLowerCase()}/latest_photos`);

    const jsonData = await utils.getData(url).catch((e) => {
        console.log("get-apod error " + e);
        res.status(500).send()
    });

    if (jsonData) {
        let roverData = List(jsonData.latest_photos);
        roverData = roverData.filter((rover) => rover.camera.name === requestCamera);
        roverData = roverData.sort((a, b) => {
            const d1 = Date.parse(a.earth_date);
            const d2 = Date.parse(b.earth_date);
            return (d1 < d2) ? 1 : -1;
        });
        res.status(200).send(JSON.stringify(roverData));
    } else {
        res.status(500).end();
    }
});
app.listen(port);
console.log("Server listening on " + port);