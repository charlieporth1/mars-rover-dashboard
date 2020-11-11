function commafy(num) {
    return num.toString().trim().replace(/\B(?=(\d{3})+(?!\d))/g, ",").toLocaleString();
}

function getInputValue(inputId) {
    return String(window.document.getElementById(inputId.toString().trim()).value).trim()
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
function capFirst(s) {
    const str = s.toString().trim();
    return str.charAt(0).toUpperCase() + str.slice(1, str.length)
}

function isEmpty(v) {
    try {
        return (v === undefined || v === null) || v.length > 0|| v.toString().trim() === "" || v === {};
    } catch (e) {
        return true;
    }
}