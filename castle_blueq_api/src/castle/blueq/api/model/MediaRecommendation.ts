import { ObjectId } from "mongodb";

// TODO: separate mongo from generic model. 

export interface MediaRecommendation {
    _id: ObjectId,
    userId: string,
    content: string,
    source: string,
    created: Date,
    updated: Date,
    notes: string
}