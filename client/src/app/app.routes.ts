import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component.js';
import { ErrorComponent } from './error/error.component.js';
import { LoginComponent } from './user/login/login.component.js';
import { RegisterComponent } from './user/register/register.component.js';
import { ProfileComponent } from './user/profile/profile.component.js';
import { CollectionComponent } from './collection/collection.component.js';
import { AddGameComponent } from './single-game/add-game/add-game.component.js';
import { CurrentGameComponent } from './single-game/current-game/current-game.component.js';
import { EditGameComponent } from './single-game/edit-game/edit-game.component.js';
import { AuthGuard } from './guards/auth.guards.js';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'login', canActivate: [AuthGuard], component: LoginComponent },
    { path: 'register', canActivate: [AuthGuard], component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'collection', 
        children: [
            { path: '', component: CollectionComponent },
            { path: ':gameId', component: CurrentGameComponent },
            { path: 'edit/:gameId', component: EditGameComponent },
        ],
    },
    { path: 'add-game', component: AddGameComponent },
    { path: '404', component: ErrorComponent},
    { path: '**', redirectTo: '/404'},  
];
