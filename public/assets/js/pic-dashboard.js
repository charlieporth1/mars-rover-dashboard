async function onClickRover(rover) {
    toggleLoader();
    const r = store.rovers.filter(r => r !== rover);
    r.map(roverId => {
        const roverElement = document.getElementById(roverId);
        roverElement.checked = false;
    });
    await getLatestRoverImages(store, rover);


}

function expandable(elementId) {
    const dataElement = document.getElementById(elementId.toString());
    const isHidden = dataElement.style.display.toString().includes("none");
    const toggleStr = !isHidden ? "none" : "block"; //custom code loaded from utils // this is a if else technical
    dataElement.style.display = toggleStr;
}

const toggleLoader = (show = null) => {
    const loaderElement = document.body.getElementsByClassName("loader")[0];
    const isVisible = (!isEmpty(show)) ? show : loaderElement.style.display.toString().includes("none");
    const toggleStr = !isVisible ? "none" : "block"; //custom code loaded from utils
    loaderElement.style.display = toggleStr;
};