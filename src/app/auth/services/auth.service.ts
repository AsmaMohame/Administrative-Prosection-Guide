import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ResourceService } from 'src/app/core/services/resource.service';
import { SettingsService } from 'src/app/core/services/settings.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ResourceService<any> {
  public isLoggedIn!: boolean;
  public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(this.isLoggedIn);
  private readonly loginUrl = `${SettingsService.configurationEnvironment.api.baseUrl}auth/login`;
  private readonly refreshUrl = `${SettingsService.configurationEnvironment.api.baseUrl}auth/refresh`;
  private readonly userInfoUrl = `${SettingsService.configurationEnvironment.api.baseUrl}auth/user-info`;
  private readonly userInfo = `${SettingsService.configurationEnvironment.api.baseUrl}user/info`;

  constructor(private http: HttpClient, private router: Router) {
    super(http);
  }
  getResourceUrl(): string {
    return 'auth/login';
  }

  login(resource: any): Observable<{ accessToken: string, refreshToken: string}> {
    return this.http.post<{ accessToken: string, refreshToken: string }>(`${this.loginUrl}`, this.toServerModel(resource), {headers: { loginPage: 'true'}}).pipe(
      catchError(err => {
        throw new Error(err.message);
      }),
      tap(() => {
        this.updateIsLoggedInStatus(true);
      })
    );
  }
  
  getUserInfo(): Observable<any> {
    return this.httpClient.get<any>(`${this.userInfoUrl}`).pipe(
        catchError(err => {
          throw new Error(err.message);
        })
    )
  }

  getUser(): Observable<any> {
    return this.httpClient.get<any>(`${this.userInfo}`).pipe(
        catchError(err => {
          throw new Error(err.message);
        })
    )
  }

  refresh(refresh: string): Observable<any> {
    return this.httpClient.post<Observable<any>>(`${this.refreshUrl}`, {refreshToken: refresh}, {headers: {observe: 'response', refresh: 'true'}})
      .pipe(
        catchError(err => {
          if (err.status === 401) {
              this.updateIsLoggedInStatus(false);
          }
          return EMPTY;
        })
      );
  }
  
  updateIsLoggedInStatus(isLogged: boolean): void{
    this.isLoggedIn = isLogged;
    this.isLoggedIn$.next(isLogged);
  }

  toServerModel(entity: any): any {
    return {
      username: entity.username,
      password: entity.password
    };
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('login');
  }
}
