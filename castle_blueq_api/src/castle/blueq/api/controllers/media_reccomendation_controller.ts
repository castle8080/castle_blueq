import { Request } from 'express';
import { MediaReccomendation, MediaReccomendationRepository } from '../repositories/media_reccomendation_repository';
import { Controller, Injectable, Inject, Req, Get, Post } from '@nestjs/common';

@Injectable()
@Controller()
export class MediaReccomendationController {

    constructor(
        @Inject('MediaReccomendationRepository')
        private repo: MediaReccomendationRepository)
    {
    }

    @Post('/api/media_reccomendations')
    async create(@Req() req: Request) {
        let mr = req.body as MediaReccomendation;
        return await this.repo.create(mr);
    }

    @Get('/api/media_reccomendations')
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