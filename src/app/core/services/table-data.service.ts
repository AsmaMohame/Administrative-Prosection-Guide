import { Injectable } from "@angular/core";
import { City } from "src/app/domain/city/model/city";
import { MuqarType } from "src/app/domain/muqar-typt/model/muqar-type";
import { Muqar } from "src/app/domain/muqar/model/muqar";
import { Column } from "src/app/shared/components/data-grid/column";



@Injectable({
  providedIn: 'root'
})
export class TableDataService {
  columns: Column[] = [];
  displayedColumns: string[] = [];
  displayedColumnFilter: string[] = [];
  constructor() { }

  getCity = () => {
    this.columns = [
      {
        columnDef: 'governorate',
        header: 'المحافظة',
        cell: (element: City) => element.governorate?.arabicName
      },
      {
        columnDef: 'arabicName',
        header: 'اسم المدينة',
        cell: (element: City) => element.arabicName
      },
    
      { columnDef: 'Actions', header: '', cell: (element: City) => `` },
    ];
    this.displayedColumns = this.columns.map(c => c.columnDef);
  };

  getMuqarType = () => {
    this.columns = [
      {
        columnDef: 'arabicName',
        header: 'نوع المقر',
        cell: (element: MuqarType) => element.arabicName
      },
   
      { columnDef: 'Actions', header: '', cell: (element: MuqarType) => `` },
    ];
    this.displayedColumns = this.columns.map(c => c.columnDef);
  };


  getMuqar = () => {
    this.columns = [
      {
        columnDef: 'name',
        header: 'اسم المقر ',
        cell: (element: Muqar) => element.name
      },
      {
        columnDef: 'governorate',
        header: 'المحافظة',
        cell: (element: Muqar) => element.governorate.arabicName
      },

      {
        columnDef: 'city',
        header: 'المدينة',
        cell: (element: Muqar) => element.city.arabicName
      },

      {
        columnDef: 'muqar-type',
        header: 'نوع المقر',
        cell: (element: Muqar) => element.muqarType.arabicName
      },

      {
        columnDef: 'competence',
        header: 'الاختصاص ',
        cell: (element: Muqar) => element.competence
      },

      {
        columnDef: 'address',
        header: 'العنوان',
        cell: (element: Muqar) => element.address
      },

      {
        columnDef: 'email',
        header: 'البريد الالكتروني',
        cell: (element: Muqar) => element.email
      },

      {
        columnDef: 'phone',
        header: 'رقم تليفون 1',
        cell: (element: Muqar) => element.phone
      },

      { columnDef: 'Actions', header: '', cell: (element: MuqarType) => `` },
    ];
    this.displayedColumns = this.columns.map(c => c.columnDef);
  };

  get tableColumns() {
    return this.columns;
  }

  get displayColumns() {
    return this.displayedColumns;
  }

  get displayColumnFilter() {
    return this.displayedColumnFilter;
  }

}
