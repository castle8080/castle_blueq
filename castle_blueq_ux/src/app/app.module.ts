import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MediaRecommendationsListComponent } from './components/media-recommendations-list/media-recommendations-list.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

import { MediaRecommendationService } from './service/media-recommendation-service';

@NgModule({
    declarations: [
        AppComponent,
        MediaRecommendationsListComponent,
        WelcomeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [
        {
            provide: MediaRecommendationService,
            useFactory: () => new MediaRecommendationService("http://localhost:3000")
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
