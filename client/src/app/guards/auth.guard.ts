import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { UserService } from "../user/user.service.js";

export const AuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const userService = inject(UserService);
    const router = inject(Router);

    if (!userService.isLogged) {
        return true;
    }
    router.navigate(['home']);
    return false;
  };