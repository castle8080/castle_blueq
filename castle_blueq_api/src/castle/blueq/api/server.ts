import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { ControllerMain } from './controller_main';

export class Server {
    run() {
        console.log("Running server.")
        dotenv.config();

        const app = express();
        let port = process.env.PORT || "8080";

        app.use(express.static('www'));

        new ControllerMain(app);

        app.get('/', (req: Request, res: Response) => {
            res.send('Express + TypeScript Server');
        });

        app.listen(port, () => {
            console.log(`[server]: Server is running at http://localhost:${port}`);
        });
    }
}