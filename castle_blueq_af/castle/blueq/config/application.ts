import { lazy } from "../lazy";
import { RecommendationRepo, RecommendationRepoCosmos } from "../repo/recommendation_repo";
import { CosmosClient } from "@azure/cosmos";

var p = require("process");

export class Application {

    private static _instance: Application = new Application();

    static get instance(): Application {
        return Application._instance;
    }

    getCosmosClientEndpoint = lazy(() =>
        "AccountEndpoint=https://blueq.documents.azure.com:443/;AccountKey=H9wt652npOBzKnf9EPrsJDBRHKbHCCK8Za3inxv73Noe7LcJyqJ2uzd7idMB3cW48vIibOAvzwDEACXPVoks6A=="
        //"AccountEndpoint=https://localhost:8081/;AccountKey=C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw=="
    );

    getCosmosClient = lazy<CosmosClient>(() => {
        p.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

        return new CosmosClient(this.getCosmosClientEndpoint())
    });

    getRecommendationRepo = lazy<RecommendationRepo>(() =>
        new RecommendationRepoCosmos(this.getCosmosClient())
    );

}
