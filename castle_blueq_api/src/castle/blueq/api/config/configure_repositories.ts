import { Container, ContainerKey } from "../../../myopic";
import { MongoClient } from "mongodb";
import {
    MediaReccomendationRepositoryMongo,
    MediaReccomendationRepository
} from "../repositories/media_reccomendation_repository";

export function configure(c: Container) {
    c.singleton(
        "MongoClient",
        async (c) => {
            let mongo_conn_str = "mongodb://blueq:blueq@localhost:27017/blueq";
            return new MongoClient(mongo_conn_str);
        }
    );

    c.singleton<MediaReccomendationRepository>(
        "MediaReccomendationRepository",
        async (c) => new MediaReccomendationRepositoryMongo(
            await c.get("MongoClient"),
            "blueq",
            "media_reccomendations"
        )
    );
}