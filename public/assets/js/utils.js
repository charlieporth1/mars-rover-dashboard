function getUrl() {
    return document.URL;
}

function isProd() {
    return getUrl().includes(".io") || getUrl().includes(".dev") || getUrl().includes(".com") || !getUrl().includes("localhost");
}

function titleCase(str) {
    let splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
}

function capFirst(s) {
    const str = (s || "   ").toString();
    return str.charAt(0).toUpperCase() + str.slice(1, str.length)
}

function isEmpty(v) {
    try {
        const universal = (v === undefined || v === null);
        if (universal) {
            return universal;
        }
        switch (typeof v) {
            case "number" || "bigint":
                return v === 0;
            case "boolean":
                return universal;
            case "string":
                return (v || '').trim() === "" || (v || '').trim().length === 0;
            case "object":
                return v === {} || universal;
            case "undefined":
                return universal;
            case "function":
                return universal;

        }
    } catch (e) {
        return true;
    }
}