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
  displayedColumnFilter:any
  columns: Column[] = [];
  muqar!: Muqar[];
  citys:City[];
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
  
  constructor(
    private tableDataService: TableDataService,
    private formBuilder: FormBuilder,
    private message: MessageService,
    private validationMessagesService: ValidationMessagesService,
    private cityRepository: CityService,
    private governorateRepository: GovernorateService,
    private muqarService : MuqarService,
    private muqarTypeService : MuqarTypeService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getGovernorate();
    this.getMuqarType();
    this.tableDataService.getMuqar();
    this.columns = this.tableDataService.tableColumns;
    this.displayedColumns = this.tableDataService.displayColumns;
    this.getMuqar();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      map: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[a-z]{2,4}$')]],
      competence: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^01[0-2,5]{1}[0-9]{8}$'), Validators.maxLength(11)]],
      phoneSecond: ['', [Validators.pattern('^01[0-2,5]{1}[0-9]{8}$'), Validators.maxLength(11)]],
      phoneThird: ['', [Validators.pattern('^01[0-2,5]{1}[0-9]{8}$'), Validators.maxLength(11)]],
      governorate: ['', Validators.required],
      city: ['', [Validators.required]],
      muqarType: ['', [Validators.required]]
    });
    this.name = this.form.controls.name as FormControl;
    this.address = this.form.controls.address as FormControl;
    this.map = this.form.controls.map as FormControl;
    this.email = this.form.controls.email as FormControl;
    this.competence = this.form.controls.competence as FormControl;
    this.phone = this.form.controls.phone as FormControl;
    this.phoneSecond = this.form.controls.phoneSecond as FormControl;
    this.phoneThird = this.form.controls.phoneThird as FormControl;
    this.governorate = this.form.controls.governorate as FormControl;
    this.city = this.form.controls.city as FormControl;
    this.muqarType = this.form.controls.muqarType as FormControl;

    this.governorate.valueChanges.subscribe(res =>{
      this.city.reset();
      this.cityRepository.getCityByGovernorateId(res.id).subscribe(res => {
        this.citys= res.data;
      });
    })
  
  }

  getGovernorate(): void {
    this.governorateRepository.getList({ size: this.size, page: this.page }).subscribe(res => {
      this.governorates = res.data;
    });
  }

  getMuqarType(): void {
    this.muqarTypeService.getList({  page: this.page, size: this.size }).subscribe(res => {
      this.MuqarTypes = res.data;
    });
  }

  getMuqar(): void {
    this.muqarService.getList({  page: this.page, size: this.size }).subscribe(res => {
      this.muqar = res.data;
    });
  }

  save(): void {
    if (this.form.valid) {
      this.submitted = true;
      this.form.controls.id.value ? this.update() : this.add();
    } else {
      this.validationMessagesService.validateAllFormFields(this.form);
    }
  }

  add(): void {
    this.muqarService.add(this.form.value).subscribe(
      _ => {
        this.message.successMessage('تم إنشاء  المقر بنجاح');
        this.getMuqar();
        this.clearForm();
        this.submitted = false;
      },
      error => {
        this.submitted = false;
      }
    );
  }

  update(): void {
    this.muqarService.update(this.form.value).subscribe(
      _ => {
        this.message.successMessage('تم تعديل  المدينة بنجاح');
        this.getMuqar();
        this.clearForm();
        this.submitted = false;
      },
      error => {
        this.submitted = false;
      }
    );
  }

  pageChanged(event: PageEvent): void {
    this.size = event.pageSize;
    this.page = event.pageIndex;
    this.getMuqar();
  }

  fetch(muqar: Muqar): void {
    this.form.patchValue(muqar);
  }

  delete(id: number): void {
    this.message
      .deleteConfirmation('هل انت متأكد من حذف بيانات  المقر ؟', 'هذا الإجراء لا يمكن التراجع عنه')
      .subscribe(res => {
        if (res)
          this.cityRepository.delete(id).subscribe(_ => {
            this.message.successMessage('تم حذف بيانات  المقر بنجاح');
            this.getMuqar();
            this.clearForm();
          });
      });
  }

  clearForm(): void {
    this.form.reset();
  }

}
