import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import compression from 'cors';
import { Container } from '../../myopic';
import { configureController } from './controllers/controllers';

export class ServerRunner {
    public app: Express;

    constructor(
        private container: Container,
        public port: number)
    {
        this.app = this.initializeExpress();
    }

    public initializeExpress() {
        const app = express();
        app.use(compression());
        app.use(express.static('www'));
        app.use(express.json());
        app.use(cors());
        return app;
    }

    public async run(): Promise<void> {
        let controllers = await this.container.getByTag<object>('Controller');
        for (let c of controllers) {
            configureController(this.app, c);
        }
        this.app.listen(this.port, () => {
            console.log(`[server]: Server is running at http://localhost:${this.port}`);
        });
    }
}
