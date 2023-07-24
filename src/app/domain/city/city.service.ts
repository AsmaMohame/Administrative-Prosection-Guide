import { Injectable } from '@angular/core';
import { City } from './model/city';
import { ResourceService } from 'src/app/core/services/resource.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Response } from 'src/app/core/models/response';

@Injectable({
  providedIn: 'root'
})
export class CityService extends ResourceService<City> {
  private readonly url = `${SettingsService.configurationEnvironment.api.baseUrl}city`;

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  getResourceUrl(): string {
    return 'city';
  }

  getCityByGovernorateId(governorateId: number, p: {} = {}): Observable<Response<City>> {
    const params = new HttpParams({ fromObject: p });
    return this.httpClient.get<Response<City>>(`${this.url}?governorateId=${governorateId}${params.toString()}`).pipe(
      catchError(err => {
        throw new Error(err.message);
      })
    );
  }


  toServerModel(entity: City): any {
    if (!entity.id) {
      return {
        version: entity.version,
        arabicName: entity.arabicName,
        englishName: entity.englishName,
        code: entity.code,
        enabled: entity.enabled,
        governorate: { id: entity.governorate.id }
      }
    }
    else {
      return { 
        id: entity.id,
        version: entity.version,
        arabicName: entity.arabicName,
        englishName: entity.englishName,
        code: entity.code,
        enabled: entity.enabled,
        governorate: { id: entity.governorate.id }
      }
    }
  }

  fromServerModel(json: any): City {
    return json;
  }
}
