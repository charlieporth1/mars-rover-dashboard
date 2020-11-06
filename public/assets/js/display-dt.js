let dtRunning = false;
(function displayDT() {
    // const moment = moment();
    if (!dtRunning) {
        dtRunning = true; // to prevent buffer overflows and overloading the system
        const dtElement = document.getElementById("top-bar-date-time");
        // let dt = (moment) ? moment.format("DD-MM-YYYY HH:mm:ss") : new Date();
        if (dtElement) {
            const dt = new Date();
            dtElement.innerHTML = dt.toLocaleString();
        }
        setTimeout(() => {
            dtRunning = false;
            displayDT();
        }, 1000);
    }
}());