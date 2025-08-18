import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiService } from '../api.service';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service.js';

export const OwnerGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
  const apiService = inject(ApiService);
  const router = inject(Router);
  const userService = inject(UserService);

  const gameId = route.params['gameId'];

  return apiService.getSingleGame(gameId).pipe(
    map(game => {
      if (game._ownerId === userService.user?._id) {
        return true;
      } else {
        router.navigate(['/collection']);
        return false;
      }
    })
  );
};