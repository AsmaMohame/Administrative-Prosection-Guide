import { Injectable } from '@angular/core';
import { City } from './model/city';
import { ResourceService } from 'src/app/core/services/resource.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import { HttpClient } from '@angular/common/http';

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

   toServerModel(entity: City): any {
    if (!entity.id) {
      return {
        version: entity.version,
        arabicName: entity.arabicName,
        englishName: entity.englishName,
        code: entity.code,
        enabled: entity.enabled,
        governorate:{id : entity.governorate.id}
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
         governorate:{id : entity.governorate.id}
      }
    }
}

 fromServerModel(json: any): City {
  return json;
}
}
