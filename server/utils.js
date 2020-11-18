require("dotenv").config();
const apiKey = process.env.NASA_API_KEY || '';
const nasaBaseApi = process.env.NASA_API_BASE_URL || '';
const axios = require('axios');

module.exports.joinPathStrings = function joinPathStrings(path1, path2) { //for url joining

};

module.exports.getData = async function getData(url) {
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

};

module.exports.generateMarsRoverUrl = function generateMarsRoverUrl(q) {
    return `https://mars-photos.herokuapp.com/${q}`;
};

module.exports.generateNasaApiUrl = function generateNasaApiUrl(q) {
    return `${nasaBaseApi}/${q}?api_key=${apiKey}`;
};