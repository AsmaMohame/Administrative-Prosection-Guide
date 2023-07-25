import { Injectable } from '@angular/core';
import { MuqarService } from './muqar/muqar.service';
import { Observable } from 'rxjs';
import { Muqar } from './muqar/model/muqar';

@Injectable({
  providedIn: 'root'
})
export class BlackBoxService {

  constructor(
    private muqarService : MuqarService
  ) { }

  getMuqarById(id: number): Observable<Muqar> {
    return this.muqarService.get(id);
  }
}
