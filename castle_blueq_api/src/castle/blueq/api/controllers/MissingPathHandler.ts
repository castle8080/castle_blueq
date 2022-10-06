import { Controller, Injectable, Get, Req, Response } from '@nestjs/common';
import express from 'express';
import fs from 'fs/promises';

@Controller()
@Injectable()
export class MissingPathHandler {

    // TODO: There should be a better way to do this.
    @Get([
        "/welcome",
        "/media_recommendations"
    ])
    async welcome(@Req() req: express.Request, @Response() resp: express.Response) {
        let absPath = await fs.realpath("www/index.html");
        return resp.sendFile(absPath);
    }
}