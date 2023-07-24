import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/core/services/message.service';
import { TableDataService } from 'src/app/core/services/table-data.service';
import { ValidationMessagesService } from 'src/app/core/services/validation-messages.service';
import { MuqarType } from 'src/app/domain/muqar-typt/model/muqar-type';
import { MuqarTypeService } from 'src/app/domain/muqar-typt/muqar-type.service';
import { Column } from 'src/app/shared/components/data-grid/column';

@Component({
  selector: 'app-muqar-type',
  templateUrl: './muqar-type.component.html',
  styleUrls: ['./muqar-type.component.scss']
})
export class MuqarTypeComponent implements OnInit {
  displayedColumns: string[] = [];
  displayedColumnFilter: any
  columns: Column[] = [];
  muqarType!: MuqarType[];
  size: number = 10;
  page: number = 0;
  totalRows: number = 0;
  form!: FormGroup;
  arabicName!: FormControl;
  englishName!: FormControl;
  enabled!: FormControl;
  submitted: boolean = false;
  searchForm!: FormGroup;

  constructor(
    private tableDataService: TableDataService,
    private formBuilder: FormBuilder,
    private message: MessageService,
    private validationMessagesService: ValidationMessagesService,
    private muqarTypeService: MuqarTypeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.tableDataService.getMuqarType();
    this.columns = this.tableDataService.tableColumns;
    this.displayedColumns = this.tableDataService.displayColumns;
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      id: [''],
      version: [0],
      arabicName: ['', [Validators.required, Validators.maxLength(50)]],
      englishName: [null, [Validators.maxLength(50)]],
      enabled: [false, Validators.required]
    });
    this.arabicName = this.form.controls.arabicName as FormControl;
    this.englishName = this.form.controls.englishName as FormControl;
    this.enabled = this.form.controls.enabled as FormControl;
    this.getMuqarType();

  }

  getMuqarType(): void {
    this.muqarTypeService.getList({ page: this.page, size: this.size }).subscribe(res => {
      this.muqarType = res.data;
      this.totalRows = res.pagination?.itemCount;
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
    this.muqarTypeService.add(this.form.value).subscribe(
      _ => {
        this.message.successMessage('تم إنشاء نوع المقر بنجاح');
        this.getMuqarType();
        this.clearForm();
        this.submitted = false;
      },
      error => {
        this.submitted = false;
      }
    );
  }

  update(): void {
    this.muqarTypeService.update(this.form.value).subscribe(
      _ => {
        this.message.successMessage('تم تعديل  نوع المقر بنجاح');
        this.getMuqarType();
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
    this.getMuqarType();
  }

  fetch(muqarType: MuqarType): void {
    this.form.patchValue(muqarType);
  }

  delete(id: number): void {
    this.message
      .deleteConfirmation('هل انت متأكد من حذف بيانات  نوع المقر ؟', 'هذا الإجراء لا يمكن التراجع عنه')
      .subscribe(res => {
        if (res)
          this.muqarTypeService.delete(id).subscribe(_ => {
            this.message.successMessage('تم حذف بيانات نوع المقر  بنجاح');
            this.getMuqarType();
            this.clearForm();
          });
      });
  }

  clearForm(): void {
    this.form.reset();
  }

  navigate(id: number): void {
    this.router.navigate([`dashboard/muqar-type`, id]);
  }

}
