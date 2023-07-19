import { Injectable } from '@angular/core';
import { ResourceService } from 'src/app/core/services/resource.service';
import { Governorate } from './model/governorate';
import { SettingsService } from 'src/app/core/services/settings.service';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GovernorateService extends ResourceService<Governorate> {
  private readonly url = `${SettingsService.configurationEnvironment.api.baseUrl}governorate`;

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  getResourceUrl(): string {
    return 'governorate';
  }

  override toServerModel(entity: Governorate): any {
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

 override fromServerModel(json: any): Governorate {
  return json;
}
}
