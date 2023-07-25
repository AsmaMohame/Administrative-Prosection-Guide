import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/core/services/message.service';
import { TableDataService } from 'src/app/core/services/table-data.service';
import { ValidationMessagesService } from 'src/app/core/services/validation-messages.service';
import { CityService } from 'src/app/domain/city/city.service';
import { City } from 'src/app/domain/city/model/city';
import { GovernorateService } from 'src/app/domain/governorate/governorate.service';
import { Governorate } from 'src/app/domain/governorate/model/governorate';
import { MuqarType } from 'src/app/domain/muqar-typt/model/muqar-type';
import { MuqarTypeService } from 'src/app/domain/muqar-typt/muqar-type.service';
import { Muqar } from 'src/app/domain/muqar/model/muqar';
import { MuqarService } from 'src/app/domain/muqar/muqar.service';
import { Column } from 'src/app/shared/components/data-grid/column';

@Component({
  selector: 'app-muqar',
  templateUrl: './muqar.component.html',
  styleUrls: ['./muqar.component.scss']
})
export class MuqarComponent implements OnInit {
  displayedColumns: string[] = [];
  displayedColumnFilter: any
  columns: Column[] = [];
  muqar!: Muqar[];
  citys: City[];
  size: number = 10;
  page: number = 0;
  form!: FormGroup;
  name!: FormControl;
  address!: FormControl
  map!: FormControl
  email!: FormControl
  competence!: FormControl
  phone!: FormControl
  phoneSecond!: FormControl
  phoneThird!: FormControl
  city!: FormControl
  muqarType: FormControl
  governorate!: FormControl;
  submitted: boolean = false;
  governorates: Governorate[];
  MuqarTypes: MuqarType[];
  searchForm: FormGroup
  cityArabicName: FormControl;
  muqarTypeName: FormControl;
  governorateName: FormControl;
  MuqarName : FormControl
  govLabel: boolean = true;
  cityLabel: boolean = true;
  muqarLabel: boolean = true;
  option: boolean = true;

  constructor(
    private tableDataService: TableDataService,
    private formBuilder: FormBuilder,
    private message: MessageService,
    private validationMessagesService: ValidationMessagesService,
    private cityRepository: CityService,
    private governorateRepository: GovernorateService,
    private muqarService: MuqarService,
    private muqarTypeService: MuqarTypeService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getGovernorate();
    this.getMuqarType();
    this.tableDataService.getMuqar();
    this.columns = this.tableDataService.tableColumns;
    this.displayedColumns = this.tableDataService.displayColumns;
    this.displayedColumnFilter = this.tableDataService.displayColumnFilter
    this.getMuqar();
    this.formToSearch()
  }

  formToSearch() {
    this.searchForm = this.formBuilder.group({
      city: [''],
      governorate: [''],
      muqarType: [''],
      name: ['']
    });
    this.cityArabicName = this.searchForm.controls.city as FormControl
    this.governorateName = this.searchForm.controls.governorate as FormControl
    this.muqarTypeName = this.searchForm.controls.muqarType as FormControl
    this.name = this.searchForm.controls.name as FormControl

    this.governorateName.valueChanges.subscribe(res => {
      this.cityArabicName.reset();
      if (res) {
        this.cityRepository.getCityByGovernorateId(res.id).subscribe(res => {
          this.citys = res.data;
        });
      }
    })
  }

  getGovernorate(): void {
    this.governorateRepository.getList(this.arguments()).subscribe(res => {
      this.governorates = res.data;
    });
  }

  getMuqarType(): void {
    this.muqarTypeService.getList(this.arguments()).subscribe(res => {
      this.MuqarTypes = res.data;
    });
  }

  getMuqar(): void {
    this.muqarService.getList(this.arguments()).subscribe(res => {
      this.muqar = res.data;
    });
  }

  pageChanged(event: PageEvent): void {
    this.size = event.pageSize;
    this.page = event.pageIndex;
    this.getMuqar();
  }

  delete(id: number): void {
    this.message
      .deleteConfirmation('هل انت متأكد من حذف بيانات  المقر ؟', 'هذا الإجراء لا يمكن التراجع عنه')
      .subscribe(res => {
        if (res)
          this.muqarService.delete(id).subscribe(_ => {
            this.message.successMessage('تم حذف بيانات  المقر بنجاح');
            this.getMuqar();
            this.clearForm();
          });
      });
  }

  clearForm(): void {
    this.searchForm.reset();
  }

  arguments(): any {
    if (this.cityArabicName?.value && this.governorateName?.value && this.muqarTypeName?.value && this.name.value)
    return {
      page: this.page,
      size: this.size,
      cityId: this.cityArabicName?.value.id,
      governorateId: this.governorateName?.value.id,
      muqarTypeId: this.muqarTypeName?.value.id,
      name : this.name?.value
    };
    else if (this.cityArabicName?.value && this.governorateName?.value && this.muqarTypeName?.value)
      return {
        page: this.page,
        size: this.size,
        cityId: this.cityArabicName?.value.id,
        governorateId: this.governorateName?.value.id,
        muqarTypeId: this.muqarTypeName?.value.id
      };
      else if (this.cityArabicName?.value && this.governorateName?.value && this.name?.value)
      return {
        page: this.page,
        size: this.size,
        cityId: this.cityArabicName?.value.id,
        governorateId: this.governorateName?.value.id,
        name: this.name?.value
      };
      else if (this.name?.value && this.governorateName?.value && this.muqarTypeName?.value)
      return {
        page: this.page,
        size: this.size,
        name: this.name?.value,
        governorateId: this.governorateName?.value.id,
        muqarTypeId: this.muqarTypeName?.value.id
      };
      else if (this.name?.value && this.cityArabicName?.value && this.muqarTypeName?.value)
      return {
        page: this.page,
        size: this.size,
        name: this.name?.value,
        cityId: this.cityArabicName?.value.id,
        muqarTypeId: this.muqarTypeName?.value.id
      };
    else if (this.cityArabicName?.value && this.governorateName?.value)
      return {
        page: this.page,
        size: this.size,
        cityId: this.cityArabicName?.value.id,
        governorateId: this.governorateName?.value.id,
      };
    else if (this.governorateName?.value && this.muqarTypeName?.value)
      return {
        page: this.page,
        size: this.size,
        governorateId: this.governorateName?.value.id,
        muqarTypeId: this.muqarTypeName?.value.id
      };
    else if (this.cityArabicName?.value && this.muqarTypeName?.value)
      return {
        page: this.page,
        size: this.size,
        cityId: this.cityArabicName?.value.id,
        muqarTypeId: this.muqarTypeName?.value.id
      };
      else if (this.cityArabicName?.value && this.name?.value)
      return {
        page: this.page,
        size: this.size,
        cityId: this.cityArabicName?.value.id,
        name: this.name?.value
      };
      else if (this.governorateName?.value && this.name?.value)
      return {
        page: this.page,
        size: this.size,
        governorateId: this.governorateName?.value.id,
        name: this.name?.value
      }; else if (this.muqarTypeName?.value && this.name?.value)
      return {
        page: this.page,
        size: this.size,
        muqarTypeId: this.muqarTypeName?.value.id,
        name: this.name?.value
      };
    else if (this.cityArabicName?.value)
      return {
        page: this.page,
        size: this.size,
        arabicName: this.cityArabicName?.value.id,
      };
    else if (this.governorateName?.value)
      return {
        page: this.page,
        size: this.size,
        governorateId: this.governorateName?.value.id
      }; else if (this.muqarTypeName?.value)
      return {
        page: this.page,
        size: this.size,
        muqarTypeId: this.muqarTypeName?.value.id
      }; else if (this.name?.value)
      return {
        page: this.page,
        size: this.size,
        name: this.name?.value
      };
    else return { page: this.page, size: this.size };
  }

  search(): void {
    this.page = 0;
    this.getMuqar()
  }

  navigate(id: number): void {
    this.router.navigate([`/edit-muqar`, id]);
  }

}
