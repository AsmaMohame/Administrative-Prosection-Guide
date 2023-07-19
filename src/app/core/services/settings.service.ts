import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Configuration } from '../models/configuration.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  static configurationEnvironment: Configuration = { api: { baseUrl: '' } };
  sideNavState$: Subject<boolean> = new Subject();
  
  setToken(token: string): void {
    localStorage.setItem('Authorization', token);
  }

  getToken(): string {
    return localStorage.getItem('Authorization') || '';
  }

  setRefreshToken(refresh: string): void {
    localStorage.setItem('refreshToken', refresh);
  }

  getRefreshToken(): string {
    return localStorage.getItem('refreshToken') || '';
  }
}
