import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongoClient } from "mongodb";

import { LoggerMiddleware } from '../middleware/LoggerMiddleware';
import { DevController } from '../controllers/DevController';
import { MediaRecommendationController } from '../controllers/MediaRecommendationController';
import { MissingPathHandler } from '../controllers/MissingPathHandler';

import { MediaRecommendationRepository } from "../repositories/MediaRecommendationRepository";
import { MediaRecommendationRepositoryMongo } from "../repositories/MediaRecommendationRepositoryMongo";

import { Config } from "../config/config";

import cors from 'cors';

@Module({
    imports: [
        ServeStaticModule.forRoot({ rootPath: "www" })
    ],
    controllers: [
        DevController,
        MediaRecommendationController,
        MissingPathHandler
    ],
    providers: [
        {
            provide: Config,
            useValue: Config.load()
        },
        {
            provide: 'MongoClient',
            useFactory: (config: Config) => {
                return new MongoClient(config.getString("mongoDBURL"));
            },
            inject: [Config]
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
            .apply(
                cors(),
                LoggerMiddleware
            )
            .forRoutes({ path: 'api/*', method: RequestMethod.ALL });
    }
}