import { MongoClient, ObjectId } from "mongodb";

export interface MediaReccomendation {
    _id: ObjectId,
    userId: string,
    content: string,
    source: string,
    created: Date,
    updated: Date,
    notes: string
}

export interface MediaReccomendationRepository {

    create(mr: MediaReccomendation): Promise<MediaReccomendation>;

    listUserById(userId: string): Promise<Array<MediaReccomendation>>;
    
    listAll(): Promise<MediaReccomendation[]>;
}

export class MediaReccomendationRepositoryMongo implements MediaReccomendationRepository {

    constructor(
        private client: MongoClient,
        private dbName: string,
        private collectionName: string) {
    }

    private collection() {
        return this.client.db(this.dbName).collection(this.collectionName)
    }

    public async create(mr: MediaReccomendation): Promise<MediaReccomendation> {
        let c = this.collection();
        let r = await c.insertOne(mr);
        return mr;
    }

    async listAll(): Promise<MediaReccomendation[]> {
        let c = this.collection();
        return (await c.find({}).toArray()) as MediaReccomendation[]; 
    }

    async listUserById(userId: string): Promise<MediaReccomendation[]> {
        let c = this.collection();
        return (await c.find({ userId: { $eq: userId } }).toArray()) as MediaReccomendation[];
    }
}