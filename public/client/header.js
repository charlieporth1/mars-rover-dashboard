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


const renderDashboardHeader = (singlePhotoJson) => {
    return `<div class="m-design" id="dashboard-header">
                <h3 id="dashboard-rover-name">${capFirst(singlePhotoJson.rover.name)}</h3>
                <div id="dashboard-header-data">
                    <label id="status-label" for="dashboard-rover-status">Status</label>
                    <p id="rover-status">${capFirst(singlePhotoJson.rover.status)}</p>
                    <label id="launch-label" for="dashboard-rover-status">Launch Date</label>
                    <p id="rover-launch">${singlePhotoJson.rover.launch_date}</p>
                     <label id="landing-label" for="dashboard-rover-status">Landing Date</label>
                    <p id="rover-landing">${singlePhotoJson.rover.landing_date}</p>   
                </div>
            </div>`;
};

const renderDashboardItems = (roverData) => {
    const photoDataArray = Array.from(roverData);

    return photoDataArray.map((photoJson, index) => {
        return `<div class="dashboard-container m-design" id="dashboard-container-${index}">
                        <img class="dashboard-img" src="${photoJson.img_src}" alt="Mars Rover photo from camera ${photoJson.camera.full_name} on ${photoJson.earth_date} on earth"/>
                        <i onclick="expandable('dashboard-item-data-${index}')" id="down-carrot-${index}" class="fas fa-caret-down down-carrot"></i>
                         ${renderDashboardItemData(photoJson, index)}
                </div>`
    }).toString().replaceAll(",", "");
};

const renderDashboardItemData = (photoJson, i) => {
    const createId = (id, isLabel = false) => {
        return `dashboard-item-${isLabel ? 'label-' : ''}${id}-${i}`;
    };
    return `<div style="display: none" id="${createId('data')}">
                <label id="${createId('earth-date', true)}" for="${createId('earth-date')}">Earth Date</label>
                <p id="${createId('earth-date')}">${photoJson.earth_date}</p>
                <label id="${createId('camera', true)}" for="${createId('camera')}">Camera</label>
                <p id="${createId('camera')}">${photoJson.camera.full_name}</p>
            </div>`;
};

const renderRovers = (rovers, selectedRover) => { //RR for sort
    return rovers.map((rover) => {
        return `<div class="radio-button-w-label">
                    <input class="radio-button" type="radio" ${rover === selectedRover ? "checked" : undefined} name="${rover}" id="${rover}" onclick="onClickRover('${rover}')" />
                    <label class="radio-button-label" for="${rover}">${rover}</label>
                </div>`
    }).toString().replaceAll(",", "");
};
// create content
const App = (state) => {
    let {rovers, apod, selectedRover, roverData} = state;
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
                <div class="radio-btn-group">
                ${renderRovers(rovers, selectedRover)}
               </div>
                 ${!isEmpty(roverData[0]) ? renderDashboardHeader(roverData[0]) : "<div/>"}
                <div id="dashboard-data">
                ${!isEmpty(roverData[0]) ? renderDashboardItems(roverData) : "<div/>"}
                </div>
        </main>
        <footer></footer>
    `;
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
    if ((!apod) || photodate.getDate() + 1 !== today.getDate()) {
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
        updateStore(store, {roverData, selectedRover});
    });
};
