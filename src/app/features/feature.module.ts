import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CityComponent } from './city/city.component';
import { MuqarTypeComponent } from './muqar-type/muqar-type.component';
import { MuqarComponent } from './muqar/muqar.component';
import { AddEditMuqarComponent } from './muqar/add-edit-muqar/add-edit-muqar.component';

const routes: Routes = [
  { path: '', component: CityComponent },
  {
    path: 'city',
    component: CityComponent,
    data: { role: ['MANAGER', 'USER', 'ADMIN'] }
  },

  {
    path: 'muqar',
    component: MuqarComponent,
    data: { role: ['MANAGER', 'USER', 'ADMIN'] }
  },

  {
    path: 'muqar-type',
    component: MuqarTypeComponent,
    data: { role: ['MANAGER', 'USER', 'ADMIN'] }
  },

  { 
    path: 'add-muqar', 
    component: AddEditMuqarComponent,
  
    data: { role: ['MANAGER', 'USER', 'ADMIN'] } 
  },
  { 
    path: 'edit-muqar/:id', 
    component: AddEditMuqarComponent,
    data: { role: ['MANAGER', 'USER', 'ADMIN'] } 
  },

];

@NgModule({
  declarations: [
    CityComponent,
    MuqarTypeComponent,
    MuqarComponent,
    AddEditMuqarComponent
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
