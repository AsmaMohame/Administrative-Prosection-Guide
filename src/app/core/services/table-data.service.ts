import { Injectable } from "@angular/core";
import { City } from "src/app/domain/city/model/city";
import { MuqarType } from "src/app/domain/muqar-typt/model/muqar-type";
import { Column } from "src/app/shared/components/data-grid/column";



@Injectable({
  providedIn: 'root'
})
export class TableDataService {
  columns: Column[] = [];
  displayedColumns: string[] = [];
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
      { columnDef: 'Search', header: '', cell: (element:MuqarType) => `` }
    ];
    this.displayedColumns = this.columns.map(c => c.columnDef);
  };

  


 
  get tableColumns() {
    return this.columns;
  }

  get displayColumns() {
    return this.displayedColumns;
  }


}
