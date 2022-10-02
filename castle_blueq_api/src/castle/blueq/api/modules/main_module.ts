import { Inject, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { MainController } from '../controllers/main_controller';
import { MediaReccomendationController } from '../controllers/media_reccomendation_controller';

import { MongoClient } from "mongodb";

import {
    MediaReccomendationRepositoryMongo,
    MediaReccomendationRepository
} from "../repositories/media_reccomendation_repository";

@Module({
    imports: [
        ServeStaticModule.forRoot({ rootPath: "www" })
    ],
    controllers: [
        MainController,
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
export class MainModule {}