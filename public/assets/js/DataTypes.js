class MarsRoverImage {
    id = 0;
    imgSrc = "";
    camera = new Camera();
    earthDate = "";
    rover = new Rover();
    constructor(json) {
        if (json) {
            this.id = json.id;
            this.imgSrc = json.img_src;
            this.earthDate = json.earth_date;
            this.camera = new Camera(json.camera);
            this.rover = new Rover(json.rover);
        }
    }
}
class Camera {
    id = 0;
    name = "";
    roverId = 5;
    fullName = "";
    constructor(json) {
        if (json) {
            this.id = json.id;
            this.name = json.name;
            this.roverId = json.rover_id;
            this.fullName = json.full_name;
        }
    }
}
class Rover {
    id = 0;
    name = "";
    landingDate = "";
    constructor(json) {
        if (json) {
            this.id = json.id;
            this.name = json.name;
            this.landingDate = json.landing_date;
        }
    }
}