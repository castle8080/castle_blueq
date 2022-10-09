import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MediaRecommendationsListComponent } from './components/media-recommendations-list/media-recommendations-list.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

import { AuthenticationService } from './service/authentication-service';
import { MSALAuthenticationService } from './service/msal-authentication-service';
import { MediaRecommendationService } from './service/media-recommendation-service';

import { environment } from '../environments/environment';
import { AuthenticationSigninComponent } from './components/authentication-signin/authentication-signin.component';

@NgModule({
    declarations: [
        AppComponent,
        MediaRecommendationsListComponent,
        WelcomeComponent,
        AuthenticationSigninComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [
        {
            provide: AuthenticationService,
            useClass: MSALAuthenticationService
        },
        {
            provide: MediaRecommendationService,
            useFactory: () => new MediaRecommendationService(environment.apiEndpoint)
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
