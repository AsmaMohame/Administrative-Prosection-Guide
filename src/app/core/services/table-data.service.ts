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
        header: 'الأسم بالعربي  ',
        cell: (element: City) => element.arabicName
      },
      {
        columnDef: 'englishName',
        header: 'الأسم بالانجليزى',
        cell: (element: City) => element.englishName
      },

      { columnDef: 'Actions', header: '', cell: (element: City) => `` },
      { columnDef: 'Search', header: '', cell: (element: City) => `` }
    ];
    this.displayedColumns = this.columns.map(c => c.columnDef);
  };

  getMuqarType = () => {
    this.columns = [
      {
        columnDef: 'arabicName',
        header: 'الأسم بالعربي  ',
        cell: (element: MuqarType) => element.arabicName
      },
      {
        columnDef: 'englishName',
        header: 'الأسم بالانجليزى',
        cell: (element: MuqarType) => element.englishName
      },

      { columnDef: 'Actions', header: '', cell: (element: MuqarType) => `` },
      { columnDef: 'Search', header: '', cell: (element: MuqarType) => `` }
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
        cell: (element: Muqar) => element.city.englishName
      },

      {
        columnDef: 'muqar-type',
        header: 'نوع المقر',
        cell: (element: Muqar) => element.muqarType.arabicName
      },

      {
        columnDef: 'competence',
        header: 'الكفاءة ',
        cell: (element: Muqar) => element.competence
      },

      {
        columnDef: 'address',
        header: 'العنوان',
        cell: (element: Muqar) => element.city.englishName
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
      { columnDef: 'Search', header: '', cell: (element: MuqarType) => `` }
    ];
    this.displayedColumns = this.columns.map(c => c.columnDef);
    this.displayedColumnFilter = this.displayedColumns.map((x) => x + '_');
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
