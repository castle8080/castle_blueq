import { Controller, Injectable, Inject, Get } from '@nestjs/common';

@Controller()
@Injectable()
export class DevController {

    @Get("/api/status")
    welcome() {
        return {
            "status": "OK"
        }
    }
}