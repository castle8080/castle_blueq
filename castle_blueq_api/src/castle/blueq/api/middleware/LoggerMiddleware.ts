import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import * as winston from 'winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        winston.info(`[HTTRequest] ${req.method} ${req.url}`);
        res.on('finish', () =>{
            winston.info(`[HTTPResponse] ${res.statusCode}`);
        });
        next();
    }
}