import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CityComponent } from './city/city.component';
import { MuqarTypeComponent } from './muqar-type/muqar-type.component';

const routes: Routes = [
  {
    path: 'city',
    component: CityComponent,
    data: { role: ['MANAGER', 'USER', 'ADMIN'] }
  },

  {
    path: 'muqar-type',
    component: MuqarTypeComponent,
    data: { role: ['MANAGER', 'USER', 'ADMIN'] }
  },

];

@NgModule({
  declarations: [
    CityComponent,
    MuqarTypeComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  exports: []
})
export class FeatureModule { }
