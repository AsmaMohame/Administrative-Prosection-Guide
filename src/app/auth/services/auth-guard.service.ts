import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { SettingsService } from 'src/app/core/services/settings.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  allowedRole: boolean = false;
  constructor(private router: Router, private SettingsService: SettingsService, private authService: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.getUserInfo().pipe(map(res => {
      localStorage.setItem("roles", JSON.stringify(res.authorities));
      for (var item of res.authorities) {
        if (route.data?.role) {
          for (var pageRole of route.data.role) {
            if (item.authority === pageRole) {
              return true
            }
          }
        }
      }

      if (this.SettingsService.getToken() && (this.allowedRole || route.routeConfig?.path == 'city')) {
        return true;
      } else {
        this.router.navigate([`/login`]);
        return false;

      }
    }))
  }
}
