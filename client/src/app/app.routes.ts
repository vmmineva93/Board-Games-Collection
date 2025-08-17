import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard.js';
import { GuestGuard } from './guards/guest.guard.js';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'home', loadComponent: () =>
            import('../app/home/home.component.js').then(
                (c) => c.HomeComponent
            ),
    },
    {
        path: 'login', canActivate: [AuthGuard], loadComponent: () =>
            import('../app/user/login/login.component.js').then(
                (c) => c.LoginComponent
            ),
    },
    {
        path: 'register', canActivate: [AuthGuard], loadComponent: () =>
            import('../app/user/register/register.component.js').then(
                (c) => c.RegisterComponent
            ),
    },
    {
        path: 'profile', canActivate: [GuestGuard], loadComponent: () =>
            import('../app/user/profile/profile.component.js').then(
                (c) => c.ProfileComponent
            ),
    },
    {
        path: 'collection',
        children: [
            {
                path: '', loadComponent: () =>
                    import('../app/collection/collection.component.js').then(
                        (c) => c.CollectionComponent
                    ),
            },
            {
                path: ':gameId', loadComponent: () =>
                    import('../app/single-game/current-game/current-game.component.js').then(
                        (c) => c.CurrentGameComponent
                    ),
            },
            {
                path: 'edit/:gameId', canActivate: [GuestGuard], loadComponent: () =>
                    import('../app/single-game/edit-game/edit-game.component.js').then(
                        (c) => c.EditGameComponent
                    ),
            },
        ],
    },
    {
        path: 'add-game', canActivate: [GuestGuard], loadComponent: () =>
            import('../app/single-game/add-game/add-game.component.js').then(
                (c) => c.AddGameComponent
            ),
    },
    {
        path: '404', loadComponent: () =>
            import('../app/error/error.component.js').then(
                (c) => c.ErrorComponent
            ),
    },
    { path: '**', redirectTo: '/404' },
];
