import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/core/services/message.service';
import { ValidationMessagesService } from 'src/app/core/services/validation-messages.service';
import { BlackBoxService } from 'src/app/domain/black-box.service';
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
  selector: 'app-add-edit-muqar',
  templateUrl: './add-edit-muqar.component.html',
  styleUrls: ['./add-edit-muqar.component.scss']
})
export class AddEditMuqarComponent {
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
  muqarId: number;
  muqare : Muqar
  constructor(
    private formBuilder: FormBuilder,
    private message: MessageService,
    private validationMessagesService: ValidationMessagesService,
    private cityRepository: CityService,
    private governorateRepository: GovernorateService,
    private muqarService: MuqarService,
    private muqarTypeService: MuqarTypeService,
    private route: ActivatedRoute,
    private blackBoxService: BlackBoxService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.muqarId = +params['id'];
      if (this.muqarId) {
        this.getMuqarById()
      }
    });
    this.initForm();
    this.getGovernorate();
    this.getMuqarType();
  }

  getMuqarById(){
    this.blackBoxService.getMuqarById(this.muqarId).subscribe(res => {
      this.muqare = res;
      if (this.muqare) {
        this.form.patchValue(this.muqare)
        this.name.patchValue(this.muqare.name);
        this.address.patchValue(this.muqare.address)
        this.map.patchValue(this.muqare.map)
        this.email.patchValue(this.muqare.email)
        this.competence.patchValue(this.muqare.competence)
        
        this.city.patchValue(this.muqare.city)
        this.governorate.patchValue(this.muqare.governorate)
        this.muqarType.patchValue(this.muqare.muqarType)
        this.phone.patchValue(this.muqare.phone)
      }
      this.submitted = false;
    })

  }

  initForm(): void {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      map: [''],
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

    this.governorate.valueChanges.subscribe(res => {
      this.city.reset();
      if (res) {
        this.cityRepository.getCityByGovernorateId(res.id).subscribe(res => {
          this.citys = res.data;
        });
      }
    })
  }

  getGovernorate(): void {
    this.governorateRepository.getList({ page: this.page, size: this.size }).subscribe(res => {
      this.governorates = res.data;
    });
  }

  getMuqarType(): void {
    this.muqarTypeService.getList({ page: this.page, size: this.size }).subscribe(res => {
      this.MuqarTypes = res.data;
    });
  }

  getMuqar(): void {
    this.muqarService.getList({ page: this.page, size: this.size }).subscribe(res => {
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
