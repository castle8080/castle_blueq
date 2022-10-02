import { Inject, Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongoClient } from "mongodb";

import { LoggerMiddleware } from '../middleware/LoggerMiddleware';
import { DevController } from '../controllers/DevController';
import { MediaReccomendationController } from '../controllers/MediaReccomendationController';
import {
    MediaReccomendationRepositoryMongo,
    MediaReccomendationRepository
} from "../repositories/MediaReccomendationRepository";

@Module({
    imports: [
        ServeStaticModule.forRoot({ rootPath: "www" })
    ],
    controllers: [
        DevController,
        MediaReccomendationController
    ],
    providers: [
        {
            provide: 'MongoClient',
            useFactory: () => {
                let mongo_conn_str = "mongodb://blueq:blueq@localhost:27017/blueq";
                return new MongoClient(mongo_conn_str);
            }
        },
        {
            provide: 'MediaReccomendationRepository',
            useFactory: (mongoClient: MongoClient) =>
                new MediaReccomendationRepositoryMongo(
                    mongoClient,
                    "blueq",
                    "media_reccomendations"
                ),
            inject: ['MongoClient']
        }
    ]
})
export class ApplicationModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes({ path: 'api/*', method: RequestMethod.ALL });
    }
}