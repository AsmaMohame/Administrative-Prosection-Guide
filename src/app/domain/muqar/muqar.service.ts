import { Injectable } from '@angular/core';
import { ResourceService } from 'src/app/core/services/resource.service';
import { Muqar } from './model/muqar';
import { SettingsService } from 'src/app/core/services/settings.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MuqarService extends ResourceService<Muqar> {
  private readonly url = `${SettingsService.configurationEnvironment.api.baseUrl}muqar`;

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  getResourceUrl(): string {
    return 'muqar';
  }

  toServerModel(entity: Muqar): any {
    if (!entity.id) {
      return {
        version: entity.version,
        name: entity.name,
        address: entity.address,
        phone: entity.phone,
        phoneSecond: entity.phoneSecond,
        phoneThird: entity.phoneThird,
        email: entity.email,
        map: entity.map,
        competence: entity.competence,
        governorate: { id: entity.governorate.id },
        city: { id: entity.city.id },
        muqarType: { id: entity.muqarType.id }
      }
    }
    else {
      return {
        id: entity.id,
        version: entity.version,
        name: entity.name,
        address: entity.address,
        phone: entity.phone,
        phoneSecond: entity.phoneSecond,
        phoneThird: entity.phoneThird,
        email: entity.email,
        map: entity.map,
        competence: entity.competence,
        governorate:{id:entity.governorate.id },
        city: { id:entity.city.id },
        muqarType: { id: entity.muqarType.id }
      }
    }
  }

  fromServerModel(json: any): Muqar {
    return json;
  }

 
}
