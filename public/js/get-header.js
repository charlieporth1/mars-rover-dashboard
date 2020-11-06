
async function getApod() {
    return await fetch('/get-apod', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(  (response)=> {
        // The API call was successful!
        if (response.ok && response.status === 200) {
            console.log(response);
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
    console.log(jsonApodData);
    const header = document.querySelector(".apod-header");
    header.style.backgroundImage = `url('${jsonApodData.url.toString()}')`;
    const h3Explanation = header.getElementsByClassName("apod-h3-explanation")[0];
    h3Explanation.innerHTML = jsonApodData.title.toString();
}());
const toDataURL = (url) => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    }));
