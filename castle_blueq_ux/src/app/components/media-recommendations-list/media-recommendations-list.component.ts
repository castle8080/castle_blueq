import { Component, OnInit } from '@angular/core';

import { MediaRecommendationService } from 'src/app/service/media-recommendation-service';
@Component({
    selector: 'app-media-reccomendations-list',
    templateUrl: './media-recommendations-list.component.html',
    styleUrls: ['./media-recommendations-list.component.scss']
})
export class MediaRecommendationsListComponent implements OnInit {

    mediaRecommendations$: Promise<any>|null;

    constructor(private mediaRecommendationService: MediaRecommendationService) {
        console.log(`Have: ${this.mediaRecommendationService}`);
        this.mediaRecommendations$ = this.mediaRecommendationService.listAll();
    }

    ngOnInit(): void {
    }

}
