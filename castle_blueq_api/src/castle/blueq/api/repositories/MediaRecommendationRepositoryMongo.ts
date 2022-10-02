import { MongoClient } from "mongodb";
import { MediaRecommendation } from "../model/MediaRecommendation";
import { MediaRecommendationRepository } from "./MediaRecommendationRepository";

export class MediaRecommendationRepositoryMongo implements MediaRecommendationRepository {

    constructor(
        private client: MongoClient,
        private dbName: string,
        private collectionName: string) {
    }

    private collection() {
        return this.client.db(this.dbName).collection(this.collectionName)
    }

    public async create(mr: MediaRecommendation): Promise<MediaRecommendation> {
        let c = this.collection();
        let r = await c.insertOne(mr);
        return mr;
    }

    async listAll(): Promise<MediaRecommendation[]> {
        let c = this.collection();
        return (await c.find({}).toArray()) as MediaRecommendation[]; 
    }

    async listUserById(userId: string): Promise<MediaRecommendation[]> {
        let c = this.collection();
        return (await c.find({ userId: { $eq: userId } }).toArray()) as MediaRecommendation[];
    }
}