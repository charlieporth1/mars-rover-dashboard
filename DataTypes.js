const moment = require('moment')();
const defaultDate = moment.format("YYYY-MM-DD");
export class MarsRoverImage {
    id = 0;
    imgSrc = "";
    camera = new Camera();
    earthDate = defaultDate;
    rover = new Rover();
    constructor(json) {
        this.id = json.id;
        this.imgSrc = json.img_src;
        this.earthDate = json.earth_date;
        this.camera = new Camera(json.camera);
        this.rover = new Rover(json.rover);
    }
}
export class Camera {
    id = 0;
    name = "";
    roverId = 5;
    fullName = "";

    constructor(json) {
        this.id = json.id;
        this.name = json.name;
        this.roverId = json.rover_id;
        this.fullName = json.full_name;
    }
}
export class Rover {
    id = 0;
    name = "";
    landingDate = defaultDate;

    constructor(json) {
        this.id = json.id;
        this.name = json.name;
        this.landingDate = json.landing_date;
    }
}