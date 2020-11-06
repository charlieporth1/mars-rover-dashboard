
async function getApod() {
    return await fetch('/get-apod', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(  (response)=> {
        // The API call was successful!
        if (response.ok && response.status === 200) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }).catch( (err)=>{
        // There was an error
        console.warn('Something went wrong. ', err);
        return Promise.reject(err);
    });
}
(async function replaceHeader() {
    const jsonApodData = await getApod().catch((e)=> console.error(e));
    const header = document.querySelector(".apod-header");
    const h3Explanation = header.getElementsByClassName("apod-h3-explanation")[0];
    const pCC = header.getElementsByClassName("copy-right-credit")[0];
    header.style.backgroundImage = `url('${jsonApodData.url}')`;
    h3Explanation.innerHTML = jsonApodData.title;
    pCC.innerHTML = jsonApodData.copyright + " (C)";

}());
