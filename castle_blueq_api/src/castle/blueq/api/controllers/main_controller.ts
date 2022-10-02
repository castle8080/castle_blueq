import { Controller, Injectable, Get } from '@nestjs/common';

@Controller()
@Injectable()
export class MainController {

    @Get("/welcome")
    welcome() {
        console.log("welcome....");
        return "this is the text!";
    }
}