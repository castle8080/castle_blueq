import { Express, Request, Response, NextFunction } from 'express';
import { MediaReccomendation, MediaReccomendationRepository } from '../repositories/media_reccomendation_repository';
import { httpHandler } from './controllers';

export class MediaReccomendationController {

    constructor(private repo: MediaReccomendationRepository) {
    }

    @httpHandler('post', '/media_reccomendations')
    async create(req: Request) {
        console.log(this);
        let mr = req.body as MediaReccomendation;
        return await this.repo.create(mr);
    }

    @httpHandler('get', '/media_reccomendations')
    async list(req: Request) {
        console.log(req.params);
        let userId = req.query["userId"];
        if (userId != null && typeof(userId) === 'string') {
            return await this.repo.listUserById(userId);
        }
        else {
            return [];
        }
    }
}