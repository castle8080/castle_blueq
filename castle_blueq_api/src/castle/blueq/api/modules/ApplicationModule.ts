import { Inject, Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongoClient } from "mongodb";

import { LoggerMiddleware } from '../middleware/LoggerMiddleware';
import { DevController } from '../controllers/DevController';
import { MediaRecommendationController } from '../controllers/MediaRecommendationController';
import { MediaRecommendationRepository } from "../repositories/MediaRecommendationRepository";
import { MediaRecommendationRepositoryMongo } from "../repositories/MediaRecommendationRepositoryMongo";

@Module({
    imports: [
        ServeStaticModule.forRoot({ rootPath: "www" })
    ],
    controllers: [
        DevController,
        MediaRecommendationController
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
            provide: 'MediaRecommendationRepository',
            useFactory: (mongoClient: MongoClient): MediaRecommendationRepository =>
                new MediaRecommendationRepositoryMongo(
                    mongoClient,
                    "blueq",
                    "media_recommendations"
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