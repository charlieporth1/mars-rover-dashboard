/* Global Variables */

// Create a new date instance dynamically with JS

this.dd = new Date();
this.newDate = dd.getMonth() + '.' + dd.getDate() + '.' + dd.getFullYear();



// (function () {
//     const button = document.body.querySelector('#generate');
//     button.addEventListener("click", async function callback() {
//         await onSubmit();
//     })
// }());

async function onSubmit() {
    const zipcode = getInputValue("zip");


    const jsonData = await getData(zipcode);
    modifyDom(jsonData)
}

async function getData(zipcode) {
    const data = {
        zipcode: zipcode.toString()
    };
    return await fetch('/get-current-weather-data', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then( (response)=> {
        // The API call was successful!
        if (response.ok && response.status === 200) {
            console.log(response);
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }).catch( (err)=>{
        // There was an error
        console.warn('Something went wrong.', err);
        return Promise.reject(err);
    });
}




function modifyDom(data) {
    const dateDiv = document.getElementById("date");
    const tempDiv = document.getElementById("temp");
    const contentDiv = document.getElementById("content");
    const feelings = getInputValue("feelings");

    dateDiv.innerHTML = data.date + " last updated";
    tempDiv.innerText = kelvinToF(parseFloat(data.temp)).toFixed(1) + "°F";
    contentDiv.innerHTML = feelings;

    toggleLoader();
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
function getInputValue(inputId) {
    return String(window.document.getElementById(inputId.toString().trim()).value).trim();
}