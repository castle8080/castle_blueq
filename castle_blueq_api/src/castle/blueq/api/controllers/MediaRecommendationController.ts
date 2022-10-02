import { Request } from 'express';
import { MediaRecommendation } from '../model/MediaRecommendation';
import { MediaRecommendationRepository } from '../repositories/MediaRecommendationRepository';
import { Controller, Injectable, Inject, Req, Get, Post } from '@nestjs/common';

@Injectable()
@Controller()
export class MediaRecommendationController {

    constructor(
        @Inject('MediaRecommendationRepository')
        private repo: MediaRecommendationRepository)
    {
    }

    @Post('/api/media_recommendations')
    async create(@Req() req: Request) {
        let mr = req.body as MediaRecommendation;
        return await this.repo.create(mr);
    }

    @Get('/api/media_recommendations')
    async list(@Req() req: Request) {
        let userId = req.query["userId"];
        if (userId != null && typeof(userId) === 'string') {
            return await this.repo.listUserById(userId);
        }
        else {
            return await this.repo.listAll();
        }
    }
}