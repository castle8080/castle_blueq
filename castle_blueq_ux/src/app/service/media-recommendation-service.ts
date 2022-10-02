
import { MediaRecommendation } from "../model/media_recommendation";

export class MediaRecommendationService {

    constructor(public apiEndpoint: string) {
    }

    async listAll(): Promise<MediaRecommendation[]> {
        let r = await fetch(
            `${this.apiEndpoint}/api/media_recommendations`,
            { mode: 'cors' }
        );
        if (!r.ok) {
            throw new Error(`Could not retrieve media recommendations: ${r.statusText}`);
        }
        return await r.json();
    }
}