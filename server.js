require("dotenv").config();

const apiKey = process.env.NASA_API_KEY || '';
const nasaBaseApi = process.env.NASA_API_BASE_URL || '';
const port = process.env.BACKEND_PORT || 3000;

const immutable = require("immutable");
const createError = require('http-errors');
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

function generateNasaUrl(q) {
    return `${nasaBaseApi}/${q}?api_key=${apiKey}`;
}

app.get("/get-apod", async (req, res) => {
    const wUrl = generateNasaUrl("apod");
    const jsonData = await getData(wUrl).catch((e) => {
        console.error("get-apod error " + e);
        res.status(500).send(e)
    });
    if (jsonData) {
        res.status(200).send(JSON.stringify(jsonData));
    } else {
        res.status(500).end("Empty Response");
    }

});

app.listen(port);
console.log("Server listening on " + port);