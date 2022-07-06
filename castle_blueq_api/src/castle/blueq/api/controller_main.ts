import { Express, Request, Response } from 'express';

export class ControllerMain {

    constructor(app: Express) {
        app.get('/mine.html', this.index);
    }

    index(req: Request, res: Response) {
        console.log("index....");
        res.send("This is the index!");
    }

}