let dtRunning = false;
(function displayDT() {
    if (!dtRunning) {
        dtRunning = true; // to prevent buffer overflows and overloading the system
        const dtElement = document.getElementById("top-bar-date-time");
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