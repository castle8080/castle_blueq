import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MediaRecommendationsListComponent } from './components/media-recommendations-list/media-recommendations-list.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthenticationSigninComponent } from './components/authentication-signin/authentication-signin.component';

const routes: Routes = [
    { path: 'media_recommendations', component: MediaRecommendationsListComponent },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'authentication/signin', component: AuthenticationSigninComponent },
    { path: '',   redirectTo: 'welcome', pathMatch: 'full' },
    { path: '**', component: WelcomeComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
