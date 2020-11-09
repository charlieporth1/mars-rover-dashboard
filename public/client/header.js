let store = {
    user: { name: "World" },
    apod: '',
    selectedRover: 0, //0-2
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
};

// add our markup to the page
const root = document.getElementById('root');

const updateStore = async (store, newState) => {
    store = Object.assign(store, newState);
    await render(root, store)
};

const render = async (root, state) => {
    root.innerHTML = App(state)
};
const App = (state) => {
    let { rovers, apod } = state;

    return `
     ${ImageOfTheDay(apod)}
        <main>
            ${Greeting(store.user.name)}
            <section>
             
              
            </section>
        </main>
        <footer></footer>
    `
};
// create content
const App = (state) => {
    let { rovers, apod } = state;

    return `
     ${ImageOfTheDay(apod)}
        <main>
            ${Greeting(store.user.name)}
            <section>
             
              
            </section>
        </main>
        <footer></footer>
    `
};

// listening for load event because page should load before any JS is called
window.addEventListener('load', async () => {
    await render(root, store)
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
    if (!apod || apod.date === today.getDate() ) {
        getImageOfTheDay(store)
    }

    // check if the photo of the day is actually type video!
    if (apod.media_type === "video") {
        return (`
            <header class="apod-header">
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>
            <p>${apod.explanation}</p>
            </header>
        `)
    } else {
        return (`
            <header class="apod-header" style="background-image: url(" ${ apod.image.url } ")">
            <h3 class="apod-h3-text">${apod.image.title}</h3>
            ${!!apod.image.copyright ? `<p class="copy-right-credit">apod.image.copyright</p>` : undefined }
            <header>
        `)
    }
};

// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
    let { apod } = state;

    fetch(`http://localhost:3000/get-apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }));

    return data
};
