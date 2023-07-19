import { Injectable } from '@angular/core';
import { ResourceService } from 'src/app/core/services/resource.service';
import { MuqarType } from './model/muqar-type';
import { SettingsService } from 'src/app/core/services/settings.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MuqarTypeService  extends ResourceService<MuqarType> {
  private readonly url = `${SettingsService.configurationEnvironment.api.baseUrl}muqar-type`;
  
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  getResourceUrl(): string {
    return 'muqar-type';
  }

   toServerModel(entity: MuqarType): any {
    if (!entity.id) {
      return {
        version: entity.version,
        arabicName: entity.arabicName,
        englishName: entity.englishName,
        code: entity.code,
        enabled: entity.enabled,
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
      }
    }
}

 fromServerModel(json: any): MuqarType {
  return json;
}

}
