import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { SettingsService } from './settings.service';
import { Configuration, Environment } from '../models/configuration.model';

@Injectable()
export class ConfigService {
  private config!: Configuration;
  private env: Environment = { env: 'development' };
  configUrl = '/config';
  envUrl = 'env';

  constructor(private http: HttpClient) {}

  load(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.loadConfig().subscribe(
        config => {
          this.config = config;
          SettingsService.configurationEnvironment = this.config;
          resolve(true);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  loadConfig(): Observable<Configuration> {
    return this.loadEnvironment().pipe(
      mergeMap(currentEnv => {
        this.env = currentEnv;
        return this.loadFile<Configuration>(currentEnv.env, this.configUrl);
      })
    );
  }

  loadEnvironment(): Observable<Environment> {
    return this.loadFile<Environment>(this.envUrl, this.configUrl);
  }

  loadFile<T>(env: string, url: string): Observable<T> {
    return this.getJSON(`${url}/${env}.json`);
  }

  public getJSON<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }
}
