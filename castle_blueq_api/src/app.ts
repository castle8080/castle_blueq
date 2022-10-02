import { NestFactory } from '@nestjs/core';
import * as winston from 'winston';

import { ApplicationModule } from './castle/blueq/api/modules/ApplicationModule';

function configureLogging() {
    winston.configure({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.printf(({ timestamp, level, message, service }) => {
                return `[${timestamp}] ${service} ${level}: ${message}`;
            })
        ),
        defaultMeta: {
          service: "Castle-Blueq-API"
        }
    })
}

async function runServer() {
    const serverPort = parseInt(process.env.PORT || "3000");

    const app = await NestFactory.create(ApplicationModule);
    winston.info(`Starter server on port: ${serverPort}`);
    await app.listen(serverPort);
}

async function main() {
    configureLogging();
    await runServer();
}

main();