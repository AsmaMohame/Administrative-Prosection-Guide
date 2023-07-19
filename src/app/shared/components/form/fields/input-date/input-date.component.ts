import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styles: [
    `
  .form-group {
    display: flex;
    flex-direction: column;
  }
  ::ng-deep .mdc-notched-outline__leading {
    border: 1px solid rgba(122, 73, 13, 0.541) !important;
    border-left: none !important;
    border-width: 3px !important;
    border-radius: 0px 15px 15px 0px !important;
    color: rgba(122, 73, 13, 0.541) !important;
  
  }
  
  ::ng-deep .mdc-notched-outline__notch {
    border: 1px solid rgba(122, 73, 13, 0.541) !important;
    border-width: 3px !important;
    color: rgba(122, 73, 13, 0.541) !important;
    border-left : none !important;
  }

  ::ng-deep div.mdc-notched-outline__notch{
    border-left : none !important;
    border-right : none !important;

  }
  
  ::ng-deep .mdc-notched-outline__trailing {
    border: 1px solid rgba(122, 73, 13, 0.541) !important;
    border-right: none !important;
    border-width: 3px !important;
    border-radius: 15px 0 0 15px !important;
    color: rgba(122, 73, 13, 0.541) !important;
  
  }

  input{
    font-weight: bold !important;
    color: #8b4513 !important;
    text-align: center;
  }
  mat-label {
    font-weight: bold;
    color: #8b4513;
  }

    `
  ]
})
export class InputDateComponent implements OnInit {
  // @ts-ignore
  @Input() control: FormControl;
  // @ts-ignore
  @Input() fieldName: string;
  @Input() data: any;
  // @ts-ignore
  @Input() onchange: Function;
  @Input() readonly: boolean= false;
  @Input() label: boolean= false;
  constructor() {}

  ngOnInit(): void { }
}
