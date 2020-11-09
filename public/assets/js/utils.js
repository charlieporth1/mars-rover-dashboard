function commafy(num) {
    return num.toString().trim().replace(/\B(?=(\d{3})+(?!\d))/g, ",").toLocaleString();
}

function getInputValue(inputId) {
    return String(window.document.getElementById(inputId.toString().trim()).value).trim()
}

function humanifyHeight(h) {
    const height = parseFloat(h);
    const ft = Math.floor(height / 12);
    const inches = height % 12;
    return ft !== 0 ? `${commafy(ft)} ft ${inches} inches`: `${inches} inches`;
}
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
function encodeId(id) {
    return id.toString().replace("\ ", "-").trim();
}
function decodeId(id) {
    return id.toString().replace("-", "\ ").trim();
}
function getUrl() {
    return document.URL;
}
function baseUrl() {
    return isProd() ? "/dinosaur.compare" : 'localhost:3000';
}
function isProd() {
    return getUrl().includes(".io") || getUrl().includes(".dev") || getUrl().includes(".com") || !getUrl().includes("localhost");
}
function titleCase(str) {
    let splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
}
function isEmpty(s) {
    const str = s.toString().trim();
    try {
        return !(str) || str === "" || str.length === 0;
    } catch (e) {
        return true;
    }
}
function kelvinToF(tempInKelvin) {
    // Prompting the user to enter today's Kelvin temperature
    const kelvin = tempInKelvin;

// Celsius is 273 degrees less than Kelvin
    const celsius = kelvin - 273;

// Calculating Fahrenheit temperature to the nearest integer
    let fahrenheit = Math.floor(celsius * (9/5) + 32);
    return fahrenheit;
}