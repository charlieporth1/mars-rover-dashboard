function toggleLoader() {
    const loaderElement = document.body.getElementsByClassName("loader")[0];
    const isHidden = loaderElement.style.display.toString().includes("none");
    const toggleStr = !isHidden ? "none" : "block"; //custom code loaded from utils
    loaderElement.style.display = toggleStr;
    const button = document.body.querySelector('#generate');
    if (!isHidden) {
        button.removeEventListener("click", () => {
        });
        button.style.backgroundColor = 'rgba(131,131,131,0.88)';
    } else {
        button.addEventListener("click", async function callback() {
            await onSubmit();
        });
        button.style.backgroundColor = '#006acb';
    }
}