import { MediaRecommendation } from "../model/MediaRecommendation";

export interface MediaRecommendationRepository {
    create(mr: MediaRecommendation): Promise<MediaRecommendation>;
    listUserById(userId: string): Promise<Array<MediaRecommendation>>;
    listAll(): Promise<MediaRecommendation[]>;
}