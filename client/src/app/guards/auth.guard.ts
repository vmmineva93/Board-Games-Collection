import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { SafeStorageService } from "../safe-storage.service.js";
import { UserService } from "../user/user.service.js";

export const AuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const userService = inject(UserService)
    const router = inject(Router)
    const safeStorage = inject(SafeStorageService);

    const token = safeStorage.getItem('X-Authorization');
   
    if (!token) {
        return true
    }
    router.navigate(['/home']);
    return false;
  };