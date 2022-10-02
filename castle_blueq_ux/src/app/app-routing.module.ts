import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MediaReccomendationsListComponent } from './components/media-reccomendations-list/media-reccomendations-list.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
    { path: 'media_reccomendations', component: MediaReccomendationsListComponent },
    { path: 'welcome', component: WelcomeComponent },
    { path: '',   redirectTo: 'welcome', pathMatch: 'full' },
    { path: '**', component: WelcomeComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
