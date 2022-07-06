import { Container, FeedOptions, SqlQuerySpec, CosmosClient } from "@azure/cosmos";

export interface Recommendation {
    id: string;
    user_id: string;
    source: string;
    content: string;
    created: Date;
}

export interface RecommendationRepo {
    create(r: Recommendation): Promise<void>;
}

export class RecommendationRepoCosmos implements RecommendationRepo {

    private cosmosClient: CosmosClient;

    constructor(cosmosClient: CosmosClient) {
        this.cosmosClient = cosmosClient;
    }

    async create(r: Recommendation): Promise<void> {
        let c = this.getContainer();
        console.log(`create: ${JSON.stringify(r)}`);

        let resp = await c.items.create(r);

        console.log(`Response: ${resp.statusCode}`);

    }

    async list(): Promise<Array<Recommendation>> {
        return null;
    }

    private getContainer(): Container {
        return this.cosmosClient
            .database("blueq")
            .container("recommendations");
    }
}