let store = {
    user: {name: "World"},
    apod: {},
    selectedRover: '',
    roverData: {},
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],

};

// add our markup to the page
const root = document.getElementById('root');

const updateStore = (store, newState) => {
    store = Object.assign(store, newState);
    render(root, store);
};

const render = (root, state) => {
    const html = App(state) || '';
    if (html && html !== '') {
        root.innerHTML = html;
    }
};
function loadRadioListener(rover)  {
    const radioElement = document.getElementById(rover);
    radioElement.addEventListener("click", () => {
        getLatestRoverImages(store, rover)
    });
};
const renderRovers = (rovers) => { //RR for sort
    return rovers.map((rover) => {
        return `<div class="radio-button-w-label">
                <input class="radio-button" type="radio" name="${rover}" id="${rover}" value="" onload="loadRadioListener('${rover}')" />
                <label class="radio-button-label" for="${rover}">${rover}</label>
                </div>`
    });
};
// create content
const App = (state) => {
    let {rovers, apod, selectedRover} = state;
    return `
            <div class="top-bar-top sticky">
    <p id="top-bar-date-time"></p>
</div>
<div class="top-bar-second">
    <div class="holder headline">
        CTP Dev Mars Rover Dashboard
    </div>
</div>
     ${ImageOfTheDay(apod)}
        <main>
            ${Greeting(state.user.name)}
            <section>
                <div class="radio-btn-group">
                ${renderRovers(rovers, selectedRover)}
  
               </div>
         
            </section>
        </main>
        <footer></footer>
    `
};

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
});

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Welcome, ${name}!</h1>
        `
    }

    return `
        <h1>Hello!</h1>
    `
};

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {

    // If image does not already exist, or it is not from today -- request it again
    const today = new Date();
    const photodate = new Date(apod.date);
    console.log(photodate.getDate(), today.getDate());
    console.log(photodate.getDate() === today.getDate());
    if ((!apod) || photodate.getDate() + 1 !== today.getDate()) {
        console.log(apod);
        getImageOfTheDay(store);
        return;
    }

    // check if the photo of the day is actually type video!
    if (apod.media_type === "video") {
        return (`
            <header class="apod-header">
            <div class="top-bar-top sticky">
                <h1>See today's featured video <a href="${apod.url}">here</a></h1>
                <h3>${apod.title}</h3>
                <p>${apod.explanation}</p>
            </header>
        `)
    } else {
        return (`
            <header class="apod-header" style="background-image: url('${encodeURI(apod.url)}')">

                <h3 class="apod-h3-text">${apod.title}</h3>
                <p class="copy-right-credit">${apod.copyright} (C)</p>
            </header>
        `)
    }
};

// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
    let {apod} = state;

    fetch(`http://localhost:3000/get-apod`)
        .then(async res => {
            apod = await res.json();
            updateStore(store, {apod})
        });
};


const getLatestRoverImages = (state, selectedRover) => {
    let {roverData} = state;
    const data = {rover: selectedRover};
    fetch('http://localhost:3000/get-latest-rover-photos', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(async res => {
        roverData = await res.json();
        debugger
        updateStore(store, {roverData, selectedRover});
    });
};
