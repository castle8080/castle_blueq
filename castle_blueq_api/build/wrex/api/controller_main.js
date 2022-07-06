"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerMain = void 0;
class ControllerMain {
    constructor(app) {
        app.get('/mine.html', this.index);
    }
    index(req, res) {
        console.log("index....");
        res.send("This is the index!");
    }
}
exports.ControllerMain = ControllerMain;
