function onClickRover(rover) {
    getLatestRoverImages(store, rover);
    const r = store.rovers.filter(r => r !== rover);
    r.map(roverId => {
        const roverElement = document.getElementById(roverId);
        roverElement.checked = false;
    });

}

function expandable(elementId) {
    const dataElement = document.getElementById(elementId.toString());
    const isHidden = dataElement.style.display.toString().includes("none");
    const toggleStr = !isHidden ? "none" : "block"; //custom code loaded from utils // this is a if else technical
    dataElement.style.display = toggleStr;
}