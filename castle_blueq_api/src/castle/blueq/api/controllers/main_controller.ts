import { Express, Request, Response } from 'express';
import { httpHandler } from './controllers';

export class MainController {

    @httpHandler('get', "/welcome")
    welcome(req: Request) {
        console.log("welcome....");
        return "this is the text!";
    }
}