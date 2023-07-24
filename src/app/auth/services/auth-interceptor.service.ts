import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError, EMPTY } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import { MessageService } from 'src/app/core/services/message.service';
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector, private settingsService: SettingsService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let ignore =
      typeof req.body === 'undefined' ||
      req.body === null ||
      req.body.toString() === '[object FormData]' ||
      req.headers.has('Content-Type');
    if (req.body instanceof FormData && ignore) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.settingsService.getToken()}`
        }
      });
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            if (req.headers.get('loginPage')) {
              this.toasterService.errorMessage(' برجاء التأكد من اسم المستخدم وكلمة المرور');
            }
            if (req.headers.get("refresh")) {
              localStorage.removeItem('Authorization');
              this.router.navigate([`/login`]);
            }
            else {
              this.unauthorized().subscribe(() => {
                req = req.clone({ setHeaders: { Authorization: `Bearer ${this.settingsService.getToken()}` } });
              })
              return this.unauthorized().pipe(switchMap(() => next.handle(req)))
            }
            return EMPTY;
          }
          return throwError(error);
        })
      );
    } else {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.settingsService.getToken()}`
        }
      });
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            if (req.headers.get('loginPage')) {
             this.toasterService.errorMessage(' برجاء التأكد من اسم المستخدم وكلمة المرور');
            }
            if (req.headers.get("refresh")) {
              localStorage.removeItem('Authorization');
              this.router.navigate([`/login`]);
            }
            else {
              this.unauthorized().subscribe(() => {
                req = req.clone({ setHeaders: { Authorization: `Bearer ${this.settingsService.getToken()}` } });
              })
              return this.unauthorized().pipe(switchMap(() => next.handle(req)))
            }
            return EMPTY;
          }
          return throwError(error);
        })
      );
    }
  }
  private unauthorized(): Observable<any> {
    const authService: AuthService = this.injector.get(AuthService);
    return authService.refresh(this.settingsService.getRefreshToken()).pipe(tap(res => {
      this.settingsService.setToken(res.accessToken);
    }));
  }

  private get toasterService(): MessageService {
    return this.injector.get(MessageService);
  }
}